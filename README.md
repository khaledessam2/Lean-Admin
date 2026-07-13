# لوحة تحكم لين أكاديمي (Lean Academy Admin)

مشروع مستقل (Angular SPA) لتعديل محتوى موقع لين أكاديمي عبر Supabase.
منفصل تماماً عن مشروع الموقع، ويشترك معه فقط في نفس مشروع Supabase.

## التشغيل
```bash
npm install       # مرة واحدة
npm start         # http://localhost:4300
```

سجّل الدخول بإيميل وكلمة سر مستخدم الأدمن (المُنشأ من Supabase → Authentication → Users).

## الإعداد
مفاتيح Supabase في: `src/environments/environment.ts`
```ts
supabase: {
  url: 'https://<project>.supabase.co',
  anonKey: '<anon public key>',
},
siteUrl: 'http://localhost:4200', // رابط الموقع العام لزر المعاينة
```

> إعداد قاعدة البيانات (الجدول + الحماية + bucket الصور) يتم مرة واحدة عبر ملف
> `supabase/schema.sql` الموجود في مشروع الموقع العام.

## النشر
```bash
npm run build     # المخرجات في dist/lean-admin (SPA ثابت)
```
انشرها على نطاق/ساب-دومين منفصل مع SPA fallback (كل المسارات → index.html).

## البنية
- `src/app/content/` — موديل المحتوى (نسخة مطابقة لما في مشروع الموقع). لو تغيّر هناك، زامنه هنا.
- `src/app/editor/schema.ts` — يصف حقول كل قسم ويقود واجهة التعديل العامة.
- `src/app/core/` — عميل Supabase، المصادقة، تحميل/حفظ المحتوى، رفع الصور.
- `src/app/pages/` — صفحتا تسجيل الدخول ولوحة التحكم.
