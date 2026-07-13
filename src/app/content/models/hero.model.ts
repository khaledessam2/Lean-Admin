/** قسم الواجهة الرئيسية (Hero) أعلى الصفحة. */
export interface HeroContent {
  /** الشارة الصغيرة فوق العنوان */
  badge: string;
  /** بداية العنوان الرئيسي */
  titleLead: string;
  /** الجزء المميّز الملوّن من العنوان */
  titleHighlight: string;
  /** الفقرة التعريفية تحت العنوان */
  paragraph: string;
  /** نص الزر الأساسي */
  primaryCta: string;
  /** نص الزر الثانوي */
  secondaryCta: string;
  /** الملاحظة الصغيرة تحت الأزرار */
  note: string;
  /** صورة الواجهة الرئيسية (مسار داخل public أو رابط من التخزين) */
  image: string;
}

export const HERO_DEFAULT: HeroContent = {
  badge: 'نظام لين الأكاديمي الإلكتروني',
  titleLead: 'تمكين النمو عبر',
  titleHighlight: 'التعليم الذكي',
  paragraph:
    'منصة رقمية متكاملة لإدارة التعليم والتدريب الإلكتروني، مصمّمة لتلبية احتياجات المؤسسات الحكومية والخاصة في تطوير كوادرها البشرية عبر التدريب الذاتي والمباشر والحضوري، مدعومة بأحدث أدوات الذكاء الاصطناعي.',
  primaryCta: 'اطّلع على الباقات',
  secondaryCta: 'اكتشف المنصة',
  note: 'جرّب المنصة الآن بدون إدخال بيانات الدفع.',
  image: 'Gemini_Generated_Image_prc66jprc66jprc6.png',
};
