import { Component, computed, input } from '@angular/core';

/** لافتة تنبيه موحّدة (نجاح / خطأ / تحذير). */
@Component({
  selector: 'app-alert',
  standalone: true,
  template: `
    <p class="flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-sm font-semibold" [class]="styles()">
      <span aria-hidden="true">{{ icon() }}</span>
      <span><ng-content /></span>
    </p>
  `,
})
export class AlertComponent {
  /** نوع اللافتة. */
  readonly type = input<'success' | 'error' | 'warn'>('error');

  protected readonly styles = computed(
    () =>
      ({
        success: 'border-green-200 bg-green-50 text-green-700',
        error: 'border-red-200 bg-red-50 text-red-600',
        warn: 'border-amber-200 bg-amber-50 text-amber-700',
      })[this.type()],
  );

  protected readonly icon = computed(
    () => ({ success: '✓', error: '⚠', warn: '⚠' })[this.type()],
  );
}
