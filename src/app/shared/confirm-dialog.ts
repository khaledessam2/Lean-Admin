import { Component, HostListener, inject } from '@angular/core';
import { ConfirmService } from './confirm.service';

/**
 * مودال التأكيد الموحّد — يُوضع مرّة واحدة في جذر التطبيق.
 * يظهر تلقائياً عند وجود طلب معلّق في {@link ConfirmService}.
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  template: `
    @if (service.pending(); as req) {
      <div
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        dir="rtl"
      >
        <!-- الخلفية المعتمة -->
        <div class="absolute inset-0 bg-navy/40 backdrop-blur-sm" (click)="cancel()"></div>

        <!-- البطاقة -->
        <div class="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-card">
          <div class="flex items-start gap-4">
            <span
              class="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
              [class]="req.danger ? 'bg-red-50 text-red-600' : 'bg-brand-50 text-brand'"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              </svg>
            </span>
            <div class="min-w-0">
              <h2 class="text-lg text-navy">{{ req.title || 'تأكيد' }}</h2>
              <p class="mt-1.5 text-sm leading-relaxed text-navy-600">{{ req.message }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-start gap-2.5">
            @if (req.danger) {
              <button
                type="button"
                class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-red-600 px-3.5 py-2 text-sm font-bold text-white shadow-soft transition-colors hover:bg-red-700 active:scale-[.98]"
                (click)="confirm()"
              >
                {{ req.confirmText || 'حذف' }}
              </button>
            } @else {
              <button type="button" class="btn btn-sm" (click)="confirm()">
                {{ req.confirmText || 'تأكيد' }}
              </button>
            }
            <button type="button" class="btn-ghost btn-sm" (click)="cancel()">
              {{ req.cancelText || 'إلغاء' }}
            </button>
          </div>
        </div>
      </div>
    }
  `,
})
export class ConfirmDialogComponent {
  protected readonly service = inject(ConfirmService);

  protected confirm(): void {
    this.service.respond(true);
  }

  protected cancel(): void {
    this.service.respond(false);
  }

  /** الإغلاق بمفتاح Escape يُعامَل كإلغاء. */
  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.service.pending()) this.cancel();
  }
}
