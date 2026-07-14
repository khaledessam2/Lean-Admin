-- ============================================================================
-- إعداد قاعدة بيانات Supabase لموقع لين أكاديمي
-- شغّل هذا الملف مرة واحدة من: Supabase Dashboard → SQL Editor → New query → لصق → Run
-- ============================================================================

-- 1) جدول محتوى الموقع: كل صف = قسم واحد (hero, features, ...) وبياناته كـ JSON
create table if not exists public.site_content (
  section    text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

-- تحديث updated_at تلقائياً عند أي تعديل
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists trg_site_content_touch on public.site_content;
create trigger trg_site_content_touch
  before update on public.site_content
  for each row execute function public.touch_updated_at();

-- 2) تفعيل حماية الصفوف (RLS)
alter table public.site_content enable row level security;

-- القراءة متاحة للجميع (الموقع العام يقرأ المحتوى)
drop policy if exists "site_content public read" on public.site_content;
create policy "site_content public read"
  on public.site_content for select
  using (true);

-- الكتابة (إضافة/تعديل/حذف) للمستخدمين المسجّلين فقط (الأدمن)
drop policy if exists "site_content auth write" on public.site_content;
create policy "site_content auth write"
  on public.site_content for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================================
-- 3) التخزين: bucket عام للصور
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('site-images', 'site-images', true)
on conflict (id) do nothing;

-- قراءة الصور متاحة للجميع
drop policy if exists "site-images public read" on storage.objects;
create policy "site-images public read"
  on storage.objects for select
  using (bucket_id = 'site-images');

-- رفع/تعديل/حذف الصور للمستخدمين المسجّلين فقط (الأدمن)
drop policy if exists "site-images auth insert" on storage.objects;
create policy "site-images auth insert"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-images');

drop policy if exists "site-images auth update" on storage.objects;
create policy "site-images auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'site-images');

drop policy if exists "site-images auth delete" on storage.objects;
create policy "site-images auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'site-images');

-- ============================================================================
-- ملاحظات:
-- • لا حاجة لإدخال بيانات ابتدائية: الموقع يعرض المحتوى الافتراضي المدمج في الكود
--   طالما الجدول فارغ، ولوحة الأدمن تكتب كل قسم عند حفظه.
-- • أنشئ مستخدم الأدمن من: Dashboard → Authentication → Users → Add user
--   (فعّل "Auto Confirm User") ثم استخدم إيميله وكلمة سره لتسجيل الدخول للوحة.
-- • أوقف "Enable email signups" من Authentication → Providers لمنع تسجيل غرباء.
-- ============================================================================
