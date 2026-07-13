import { Injectable, signal } from '@angular/core';

/** خيارات رسالة التأكيد. */
export interface ConfirmOptions {
  /** عنوان الرسالة. */
  title?: string;
  /** نص السؤال. */
  message: string;
  /** نص زر التأكيد. */
  confirmText?: string;
  /** نص زر الإلغاء. */
  cancelText?: string;
  /** هل الإجراء خطر (يُلوّن زر التأكيد بالأحمر). */
  danger?: boolean;
}

interface PendingConfirm extends ConfirmOptions {
  resolve: (value: boolean) => void;
}

/**
 * خدمة تأكيد موحّدة: تعرض مودال Tailwind وتنتظر ردّ المستخدم.
 * الاستخدام: `if (await confirm.ask({ message: '…' })) { … }`
 */
@Injectable({ providedIn: 'root' })
export class ConfirmService {
  /** الطلب الحالي المعلّق (null = لا يوجد مودال مفتوح). */
  readonly pending = signal<PendingConfirm | null>(null);

  /** يفتح المودال ويُرجع Promise يتحقّق بـ true عند التأكيد و false عند الإلغاء. */
  ask(options: ConfirmOptions): Promise<boolean> {
    // لو كان هناك طلب معلّق نلغيه أولاً حتى لا يبقى Promise معلّقاً.
    this.pending()?.resolve(false);
    return new Promise<boolean>((resolve) => {
      this.pending.set({ ...options, resolve });
    });
  }

  /** يُنهي الطلب الحالي بنتيجة محدّدة ويغلق المودال. */
  respond(result: boolean): void {
    const current = this.pending();
    if (!current) return;
    this.pending.set(null);
    current.resolve(result);
  }
}
