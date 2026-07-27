import { ICON_NAMES, SectionKey, SECTION_ORDER } from '@site/content/site-content';

/** أنواع الحقول التي يدعمها المحرّر العام. */
export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'image'
  | 'select'
  | 'stringlist'
  | 'objectlist';

export interface FieldSchema {
  /** اسم الخاصية في الكائن */
  key: string;
  /** التسمية العربية المعروضة */
  label: string;
  type: FieldType;
  /** خيارات القائمة المنسدلة (لنوع select) */
  options?: readonly string[];
  /** هل يقبل الحقل قيمة فارغة (null) — لحقول الأرقام */
  nullable?: boolean;
  /** نوع عناصر القائمة النصية (stringlist) */
  itemType?: 'text' | 'textarea';
  /** التسمية المفردة لعنصر القائمة (زر الإضافة) */
  itemLabel?: string;
  /** حقول عنصر القائمة (objectlist) */
  fields?: FieldSchema[];
}

export interface SectionSchema {
  key: SectionKey;
  label: string;
  fields: FieldSchema[];
}

/** الحقول التي تحتاج عرضًا كاملًا في الشبكة (نصوص طويلة/قوائم/صور). */
export function isWideField(f: FieldSchema): boolean {
  return f.type === 'textarea' || f.type === 'stringlist' || f.type === 'objectlist' || f.type === 'image';
}

/** الحقول الثقيلة التي تُعرض في بطاقة مستقلّة (القوائم). */
export function isBlockField(f: FieldSchema): boolean {
  return f.type === 'stringlist' || f.type === 'objectlist';
}

const ICON_OPTIONS = ICON_NAMES;

/** وصف حقول كل قسم — مصدر الحقيقة لواجهة الأدمن. */
const SCHEMAS: Record<SectionKey, FieldSchema[]> = {
  brand: [
    { key: 'logo', label: 'صورة الشعار (اتركه فارغاً لاستخدام الشعار المرسوم)', type: 'image' },
    { key: 'alt', label: 'النص البديل للشعار', type: 'text' },
  ],
  hero: [
    { key: 'badge', label: 'الشارة العلوية', type: 'text' },
    { key: 'titleLead', label: 'بداية العنوان', type: 'text' },
    { key: 'titleHighlight', label: 'الجزء المميّز من العنوان', type: 'text' },
    { key: 'paragraph', label: 'الفقرة التعريفية', type: 'textarea' },
    { key: 'primaryCta', label: 'زر أساسي', type: 'text' },
    { key: 'secondaryCta', label: 'زر ثانوي', type: 'text' },
    { key: 'image', label: 'الصورة الرئيسية', type: 'image' },
  ],
  overview: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    { key: 'intro', label: 'المقدّمة', type: 'textarea' },
    {
      key: 'modes', label: 'أنماط التدريب', type: 'objectlist', itemLabel: 'نمط',
      fields: [
        { key: 'title', label: 'العنوان', type: 'text' },
        { key: 'en', label: 'بالإنجليزية', type: 'text' },
        { key: 'desc', label: 'الوصف', type: 'textarea' },
        { key: 'icon', label: 'الأيقونة', type: 'select', options: ['self', 'live', 'inperson'] },
      ],
    },
    { key: 'aiTitle', label: 'عنوان لافتة الذكاء الاصطناعي', type: 'text' },
    { key: 'aiText', label: 'نص لافتة الذكاء الاصطناعي', type: 'textarea' },
  ],
  features: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    { key: 'intro', label: 'المقدّمة', type: 'textarea' },
    {
      key: 'items', label: 'المميزات', type: 'objectlist', itemLabel: 'ميزة',
      fields: [
        { key: 'no', label: 'الرقم', type: 'text' },
        { key: 'icon', label: 'الأيقونة', type: 'select', options: ICON_OPTIONS },
        { key: 'title', label: 'العنوان', type: 'text' },
        { key: 'desc', label: 'الوصف', type: 'textarea' },
      ],
    },
  ],
  audience: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    {
      key: 'roles', label: 'الأدوار', type: 'objectlist', itemLabel: 'دور',
      fields: [
        { key: 'label', label: 'اسم الدور', type: 'text' },
        { key: 'key', label: 'المعرّف (إنجليزي)', type: 'text' },
        { key: 'icon', label: 'الأيقونة', type: 'select', options: ICON_OPTIONS },
        { key: 'headline', label: 'العنوان', type: 'text' },
        { key: 'desc', label: 'الوصف', type: 'textarea' },
        { key: 'points', label: 'النقاط', type: 'stringlist', itemType: 'text', itemLabel: 'نقطة' },
      ],
    },
  ],
  reports: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    { key: 'intro', label: 'المقدّمة', type: 'textarea' },
    { key: 'cardTitle', label: 'عنوان البطاقة', type: 'text' },
    { key: 'cardYear', label: 'سنة البطاقة', type: 'text' },
    {
      key: 'stats', label: 'الإحصائيات', type: 'objectlist', itemLabel: 'إحصائية',
      fields: [
        { key: 'value', label: 'القيمة', type: 'text' },
        { key: 'label', label: 'التسمية', type: 'text' },
      ],
    },
    {
      key: 'bars', label: 'أعمدة المخطط', type: 'objectlist', itemLabel: 'عمود',
      fields: [
        { key: 'm', label: 'الشهر', type: 'text' },
        { key: 'h', label: 'الارتفاع (0-100)', type: 'number' },
      ],
    },
    { key: 'items', label: 'أنواع التقارير', type: 'stringlist', itemType: 'text', itemLabel: 'تقرير' },
  ],
  clients: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    { key: 'intro', label: 'المقدّمة', type: 'textarea' },
    {
      key: 'logos', label: 'الجهات', type: 'objectlist', itemLabel: 'جهة',
      fields: [
        { key: 'name', label: 'الاسم', type: 'text' },
        { key: 'logo', label: 'الشعار', type: 'image' },
      ],
    },
    { key: 'testimonialQuote', label: 'نص الشهادة', type: 'textarea' },
    { key: 'testimonialAuthor', label: 'صاحب الشهادة', type: 'text' },
    { key: 'testimonialRole', label: 'صفة صاحب الشهادة', type: 'text' },
  ],
  faq: [
    { key: 'eyebrow', label: 'العنوان الفرعي', type: 'text' },
    { key: 'title', label: 'العنوان', type: 'text' },
    {
      key: 'items', label: 'الأسئلة', type: 'objectlist', itemLabel: 'سؤال',
      fields: [
        { key: 'q', label: 'السؤال', type: 'text' },
        { key: 'a', label: 'الإجابة', type: 'textarea' },
      ],
    },
  ],
  contact: [
    { key: 'title', label: 'العنوان', type: 'text' },
    { key: 'intro', label: 'المقدّمة', type: 'textarea' },
    {
      key: 'contacts', label: 'وسائل التواصل', type: 'objectlist', itemLabel: 'وسيلة',
      fields: [
        { key: 'type', label: 'النوع', type: 'select', options: ['web', 'mail', 'phone'] },
        { key: 'label', label: 'التسمية', type: 'text' },
        { key: 'value', label: 'القيمة', type: 'text' },
      ],
    },
    { key: 'nameLabel', label: 'تسمية حقل الاسم', type: 'text' },
    { key: 'namePlaceholder', label: 'تلميح حقل الاسم', type: 'text' },
    { key: 'orgLabel', label: 'تسمية حقل الجهة', type: 'text' },
    { key: 'orgPlaceholder', label: 'تلميح حقل الجهة', type: 'text' },
    { key: 'emailLabel', label: 'تسمية حقل البريد', type: 'text' },
    { key: 'emailPlaceholder', label: 'تلميح حقل البريد', type: 'text' },
    { key: 'messageLabel', label: 'تسمية حقل الرسالة', type: 'text' },
    { key: 'messagePlaceholder', label: 'تلميح حقل الرسالة', type: 'text' },
    { key: 'submitLabel', label: 'نص زر الإرسال', type: 'text' },
    { key: 'sendingLabel', label: 'نص أثناء الإرسال', type: 'text' },
    { key: 'privacyNote', label: 'ملاحظة الخصوصية', type: 'text' },
    { key: 'successTitle', label: 'عنوان النجاح', type: 'text' },
    { key: 'successText', label: 'نص النجاح', type: 'text' },
    { key: 'successAgain', label: 'نص زر "إرسال آخر"', type: 'text' },
  ],
  navbar: [
    {
      key: 'links', label: 'روابط القائمة', type: 'objectlist', itemLabel: 'رابط',
      fields: [
        { key: 'label', label: 'النص', type: 'text' },
        { key: 'route', label: 'المسار', type: 'text' },
        { key: 'fragment', label: 'جزء الصفحة (اختياري)', type: 'text' },
      ],
    },
    { key: 'cta', label: 'نص زر الدعوة', type: 'text' },
  ],
  footer: [
    { key: 'blurb', label: 'النص التعريفي', type: 'textarea' },
    {
      key: 'socials', label: 'روابط التواصل الاجتماعي', type: 'objectlist', itemLabel: 'رابط',
      fields: [
        { key: 'label', label: 'المنصة (Facebook/X/Instagram/LinkedIn)', type: 'text' },
        { key: 'href', label: 'الرابط', type: 'text' },
      ],
    },
    {
      key: 'columns', label: 'أعمدة التذييل', type: 'objectlist', itemLabel: 'عمود',
      fields: [
        { key: 'title', label: 'عنوان العمود', type: 'text' },
        {
          key: 'links', label: 'الروابط', type: 'objectlist', itemLabel: 'رابط',
          fields: [
            { key: 'label', label: 'النص', type: 'text' },
            { key: 'route', label: 'المسار', type: 'text' },
            { key: 'fragment', label: 'جزء الصفحة (اختياري)', type: 'text' },
          ],
        },
      ],
    },
    { key: 'copyright', label: 'نص حقوق النشر', type: 'text' },
    { key: 'year', label: 'السنة', type: 'number' },
    // روابط أسفل التذييل (الشروط والأحكام / سياسة الخصوصية) ثابتة في الموقع وغير قابلة للتعديل من هنا.
  ],
};

/** قائمة الأقسام بالترتيب مع سكيمتها. */
export const SECTION_SCHEMAS: SectionSchema[] = SECTION_ORDER.map((s) => ({
  key: s.key,
  label: s.label,
  fields: SCHEMAS[s.key],
}));
