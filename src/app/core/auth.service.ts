import { Injectable, signal } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from './supabase.client';

/** إدارة تسجيل دخول الأدمن عبر Supabase Auth. */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** الجلسة الحالية (null = غير مسجّل الدخول). */
  readonly session = signal<Session | null>(null);
  /** هل انتهى الفحص الأولي للجلسة؟ */
  readonly ready = signal(false);

  constructor() {
    if (!isSupabaseConfigured()) {
      this.ready.set(true);
      return;
    }
    supabase.auth
      .getSession()
      .then(({ data }) => this.session.set(data.session))
      .catch(() => {})
      .finally(() => this.ready.set(true));
    supabase.auth.onAuthStateChange((_event, session) => {
      this.session.set(session);
    });
  }

  get isLoggedIn(): boolean {
    return this.session() !== null;
  }

  get email(): string | undefined {
    return this.session()?.user?.email;
  }

  /** تسجيل الدخول بالبريد وكلمة السر. يرمي خطأً عند الفشل. */
  async signIn(email: string, password: string): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    await supabase.auth.signOut();
  }
}
