import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

/** يمنع الوصول للوحة إلا بعد تسجيل الدخول. */
export const authGuard: CanActivateFn = async () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // انتظر انتهاء الفحص الأولي للجلسة
  while (!auth.ready()) {
    await new Promise((r) => setTimeout(r, 20));
  }

  if (auth.isLoggedIn) return true;
  return router.createUrlTree(['/login']);
};
