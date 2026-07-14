# لوحة تحكم المحتوى — دليل الإعداد

مشروعان منفصلان تماماً يشتركان في نفس مشروع Supabase:

- **الموقع العام** `lean` على المسار: `C:\Users\khaled\Desktop\lean-academy\lean`
  يقرأ محتواه من Supabase، ولو مفيش أي تعديل يرجع للمحتوى الأصلي المدمج في الكود.
- **لوحة الأدمن** (هذا المشروع `lean-admin`) تسجّل منها الدخول وتعدّل أي نص أو صورة،
  والتغيير يظهر على الموقع بعد إعادة تحميل الصفحة.

## 1) إعداد قاعدة البيانات (مرة واحدة)
1. افتح مشروعك على Supabase → **SQL Editor** → **New query**.
2. الصق محتوى الملف [`supabase/schema.sql`](supabase/schema.sql) بالكامل واضغط **Run**.
   - ده بيعمل: جدول `site_content` + سياسات الحماية (RLS) + bucket صور اسمه `site-images`.

## 2) إنشاء مستخدم الأدمن
1. **Authentication → Users → Add user**.
2. اكتب إيميلك وكلمة سر، وفعّل **Auto Confirm User**.
3. (مهم للأمان) **Authentication → Providers → Email** → أوقف **Enable email signups**
   عشان محدش يقدر يسجّل حساب جديد غيرك.

## 3) وضع المفاتيح في الكود
من **Project Settings → API** انسخ **Project URL** و **anon public** key، وحطهم في:
- لوحة الأدمن (هذا المشروع): [`src/environments/environment.ts`](src/environments/environment.ts)
- الموقع العام: `C:\Users\khaled\Desktop\lean-academy\lean\src\environments\environment.ts`

(نفس القيم في المشروعين لأنهما يستخدمان نفس مشروع Supabase.)

## 4) التشغيل محلياً
- لوحة الأدمن (من هذا المجلد):  `npm start`  → http://localhost:4300
- الموقع العام (من مجلد `lean`):  `npm start`  → http://localhost:4200

سجّل الدخول للوحة بإيميل وكلمة سر الأدمن، اختر أي قسم من القائمة الجانبية،
عدّل النصوص/الصور/الأسعار، ثم اضغط **حفظ التغييرات**. افتح الموقع العام لتشوف التغيير.

- زر **رفع صورة جديدة** يرفع الصورة إلى Supabase Storage ويحفظ رابطها تلقائياً.
- زر **إرجاع للأصلي** يمسح تعديلات القسم ويرجّعه لمحتواه الأصلي.

## 5) النشر (Production)
- لوحة الأدمن (من هذا المجلد):  `npm run build`  → `dist/lean-admin` (موقع ثابت SPA).
  انشرها على نطاق/ساب-دومين منفصل مع SPA fallback (كل المسارات → `index.html`).
- الموقع العام (من مجلد `lean`):  `npm run build`  → `dist/lean` (SSR: `npm run serve:ssr:lean`).

## مزامنة موديل المحتوى
الموديل موجود في المشروعين (`src/app/content/`). لو أضفت/غيّرت حقلاً في مشروع،
انسخ نفس التغيير للمشروع الآخر، وحدّث السكيمة في `src/app/editor/schema.ts`
هنا في الأدمن لو أضفت حقلاً جديداً تريد تعديله من اللوحة.

## ملاحظات
- مفتاح anon آمن يكون في كود الواجهة (ده تصميم Supabase). الحماية الحقيقية من سياسات RLS:
  القراءة عامة، والكتابة للمستخدم المسجّل فقط.
- المحتوى الافتراضي موجود في `src/app/content/models/` — ملف لكل قسم.
