import { Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SECTIONS } from '../../../editor/section-meta';
import { SectionIconComponent } from '../../../shared/section-icon';
import { BrandComponent } from '../../../shared/brand';

/** القائمة الجانبية بأسلوب Poseidon: شعار + مجموعة روابط الأقسام. */
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, SectionIconComponent, BrandComponent],
  template: `
    <aside
      class="fixed inset-y-0 right-0 z-30 flex w-72 flex-col border-e border-line bg-white
             transition-transform duration-300 md:static md:z-auto md:translate-x-0"
      [class.translate-x-0]="open()"
      [class.translate-x-full]="!open()"
      [class.md:w-72]="true"
    >
      <!-- الشعار -->
      <div class="flex h-16 shrink-0 items-center px-5">
        <app-brand />
      </div>

      <!-- التنقّل -->
      <nav class="flex-1 overflow-y-auto px-3 pb-6">
        <p class="px-3 pb-2 pt-3 text-[11px] font-extrabold uppercase tracking-widest text-navy-600/70">
          الأقسام
        </p>

        <div class="flex flex-col gap-1">
          @for (s of sections; track s.key) {
            <a
              [routerLink]="['/', s.slug]"
              routerLinkActive
              #rla="routerLinkActive"
              (click)="navigate.emit()"
              class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold transition-colors"
              [class]="
                rla.isActive
                  ? 'bg-brand-50 text-brand'
                  : 'text-navy-600 hover:bg-cream-deep hover:text-navy'
              "
            >
              <span
                class="grid h-8 w-8 shrink-0 place-items-center rounded-lg transition-colors"
                [class]="rla.isActive ? 'bg-brand text-white shadow-soft' : 'bg-cream-deep text-navy-600 group-hover:bg-white'"
              >
                <app-section-icon [name]="s.icon" [size]="18" />
              </span>
              <span class="whitespace-nowrap">{{ s.label }}</span>
            </a>
          }
        </div>
      </nav>
    </aside>
  `,
})
export class SidebarComponent {
  protected readonly sections = SECTIONS;

  /** مفتوحة على شاشات الجوال (درج جانبي). */
  readonly open = input(false);
  /** يُطلق عند اختيار قسم لإغلاق الدرج على الجوال. */
  readonly navigate = output<void>();
}
