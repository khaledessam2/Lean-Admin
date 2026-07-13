import { Component, input } from '@angular/core';

/** شعار لين أكاديمي بأسلوب Poseidon — بلاطة نيلية + الاسم. */
@Component({
  selector: 'app-brand',
  standalone: true,
  template: `
    <span class="inline-flex items-center gap-2.5">
      <span
        class="grid place-items-center rounded-xl bg-gradient-to-br from-brand to-brand-700 text-white shadow-soft"
        [class]="size() === 'lg' ? 'h-10 w-10' : 'h-9 w-9'"
      >
        <svg
          [attr.width]="size() === 'lg' ? 22 : 20"
          [attr.height]="size() === 'lg' ? 22 : 20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.7"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m12 4 10 5-10 5L2 9l10-5Z" />
          <path d="M6 11v4c0 1.4 2.7 2.6 6 2.6s6-1.2 6-2.6v-4" />
          <path d="M22 9v5" />
        </svg>
      </span>
      <span class="font-extrabold leading-none" [class]="size() === 'lg' ? 'text-xl' : 'text-lg'">
        <span class="text-navy">Lean</span> <span class="text-brand">academy</span>
      </span>
    </span>
  `,
})
export class BrandComponent {
  /** حجم الشعار. */
  readonly size = input<'md' | 'lg'>('md');
}
