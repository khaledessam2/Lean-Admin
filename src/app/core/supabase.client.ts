import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '@site-env/environment';

/** هل تم ضبط مفاتيح Supabase؟ */
export const isSupabaseConfigured = (): boolean =>
  !!environment.supabase.url && !!environment.supabase.anonKey;

// قيم بديلة حتى لا يرمي createClient خطأً قبل ضبط المفاتيح (الاستخدام محميّ بـ isSupabaseConfigured)
const url = environment.supabase.url || 'https://placeholder.supabase.co';
const key = environment.supabase.anonKey || 'placeholder-anon-key';

/** عميل Supabase وحيد لتطبيق الأدمن (مصادقة + قاعدة بيانات + تخزين). */
export const supabase: SupabaseClient = createClient(url, key, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
