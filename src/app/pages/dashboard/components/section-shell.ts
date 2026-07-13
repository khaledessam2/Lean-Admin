import { Component, computed, inject, input } from '@angular/core';
import { AlertComponent } from '../../../shared/alert';
import { SectionIconComponent } from '../../../shared/section-icon';
import { SECTION_SCHEMAS } from '../../../editor/schema';
import { SECTION_META } from '../../../editor/section-meta';
import { ContentStore } from '../../../core/content-store';
import { ConfirmService } from '../../../shared/confirm.service';
import { SectionKey } from '@site/content/site-content';

/**
 * إطار صفحة القسم: ترويسة (أيقونة/عنوان/وصف) + أزرار حفظ/إرجاع + تنبيهات + بطاقة.
 * كل صفحة تُمرّر مفتاحها وتُسقِط تصميم حقولها داخل <ng-content>.
 */
@Component({
  selector: 'app-section-shell',
  standalone: true,
  imports: [AlertComponent, SectionIconComponent],
  template: `
    <div class="w-full px-5 py-6 md:px-8 lg:px-10 lg:py-8">
      <!-- الترويسة -->
      <header class="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-line pb-6">
        <div class="flex items-start gap-4">
          <span class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand">
            <app-section-icon [name]="meta().icon" [size]="24" />
          </span>
          <div>
            <p class="text-xs font-extrabold uppercase tracking-widest text-brand">تحرير القسم</p>
            <h1 class="mt-0.5 text-2xl text-navy">{{ label() }}</h1>
            <p class="mt-1.5 max-w-2xl text-sm text-navy-600">{{ meta().description }}</p>
          </div>
        </div>
        <div class="flex gap-2.5">
          <button type="button" class="btn-ghost btn-sm" (click)="onReset()" [disabled]="store.saving()">
            إرجاع للأصلي
          </button>
          <button type="button" class="btn btn-sm" (click)="onSave()" [disabled]="store.saving()">
            @if (store.saving()) {
              <span class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
              جارٍ الحفظ…
            } @else {
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12.5 10 17l9-10" />
              </svg>
              حفظ التغييرات
            }
          </button>
        </div>
      </header>

      @if (store.error()) {
        <div class="mb-5"><app-alert type="error">{{ store.error() }}</app-alert></div>
      }
      @if (store.isSaved(sectionKey())) {
        <div class="mb-5">
          <app-alert type="success">تم الحفظ بنجاح — التغيير ظاهر الآن على الموقع.</app-alert>
        </div>
      }

      <!-- محتوى الصفحة (تصميم خاص بكل قسم) -->
      <ng-content />
    </div>
  `,
})
export class SectionShellComponent {
  protected readonly store = inject(ContentStore);
  private readonly confirm = inject(ConfirmService);

  readonly sectionKey = input.required<SectionKey>();

  protected readonly label = computed(
    () => SECTION_SCHEMAS.find((s) => s.key === this.sectionKey())?.label ?? 'قسم',
  );
  protected readonly meta = computed(() => SECTION_META[this.sectionKey()]);

  constructor() {
    // تنظيف رسائل الحالة عند فتح قسم جديد.
    this.store.clearStatus();
  }

  protected async onSave(): Promise<void> {
    const ok = await this.confirm.ask({
      title: 'حفظ التغييرات',
      message: 'سيتم حفظ التغييرات ونشرها على الموقع مباشرةً. متابعة؟',
      confirmText: 'حفظ',
    });
    if (!ok) return;
    void this.store.save(this.sectionKey());
  }

  protected async onReset(): Promise<void> {
    const ok = await this.confirm.ask({
      title: 'إرجاع للأصلي',
      message: 'سيتم إرجاع هذا القسم إلى محتواه الأصلي وفقدان تعديلاتك غير المحفوظة. متابعة؟',
      confirmText: 'إرجاع',
      danger: true,
    });
    if (!ok) return;
    void this.store.reset(this.sectionKey());
  }
}
