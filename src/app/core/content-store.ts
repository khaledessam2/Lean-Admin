import { Injectable, computed, inject, signal } from '@angular/core';
import { ContentAdminService } from './content-admin.service';
import { SectionKey } from '@site/content/site-content';

/**
 * مخزن الحالة المشترك للوحة التحكم.
 * يحمّل المحتوى مرّة واحدة ويحتفظ بنسخة العمل، ويشاركها بين صفحات الأقسام.
 */
@Injectable({ providedIn: 'root' })
export class ContentStore {
  private readonly content = inject(ContentAdminService);

  /** نسخة عمل قابلة للتعديل من كامل المحتوى. */
  working = signal<Record<string, any>>({});

  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly error = signal('');
  readonly savedKey = signal<SectionKey | null>(null);

  /** جاهزٌ للعرض متى تحمّل المحتوى بنجاح. */
  readonly ready = computed(() => Object.keys(this.working()).length > 0);

  private loaded = false;

  /** يُحمّل المحتوى مرّة واحدة فقط. */
  async ensureLoaded(): Promise<void> {
    if (this.loaded) return;
    this.loading.set(true);
    this.error.set('');
    try {
      this.working.set((await this.content.loadAll()) as unknown as Record<string, any>);
      this.loaded = true;
    } catch (err: any) {
      this.error.set('تعذّر تحميل المحتوى: ' + (err?.message || 'خطأ غير معروف'));
    } finally {
      this.loading.set(false);
    }
  }

  /** نموذج قسم بعينه (كائن قابل للتعديل مباشرة). */
  model(key: SectionKey): any {
    return this.working()[key];
  }

  /** هل حُفظ هذا القسم للتوّ. */
  isSaved(key: SectionKey): boolean {
    return this.savedKey() === key && !this.error();
  }

  clearStatus(): void {
    this.savedKey.set(null);
    this.error.set('');
  }

  async save(key: SectionKey): Promise<void> {
    this.saving.set(true);
    this.error.set('');
    this.savedKey.set(null);
    try {
      await this.content.saveSection(key, this.working()[key]);
      this.savedKey.set(key);
    } catch (err: any) {
      this.error.set('تعذّر الحفظ: ' + (err?.message || 'خطأ غير معروف'));
    } finally {
      this.saving.set(false);
    }
  }

  async reset(key: SectionKey): Promise<void> {
    this.saving.set(true);
    this.error.set('');
    try {
      await this.content.resetSection(key);
      this.working.update((w) => ({ ...w, [key]: this.content.defaultSection(key) }));
      this.savedKey.set(key);
    } catch (err: any) {
      this.error.set('تعذّر الإرجاع: ' + (err?.message || 'خطأ غير معروف'));
    } finally {
      this.saving.set(false);
    }
  }
}
