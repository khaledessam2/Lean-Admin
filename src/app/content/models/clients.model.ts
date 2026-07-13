/** قسم العملاء + شهادة العميل. */

export interface ClientsContent {
  eyebrow: string;
  title: string;
  intro: string;
  /** أسماء الجهات/العملاء */
  logos: string[];
  testimonialQuote: string;
  testimonialAuthor: string;
  testimonialRole: string;
}

export const CLIENTS_DEFAULT: ClientsContent = {
  eyebrow: 'عملاؤنا',
  title: 'موثوق من جهات حكومية وأكاديمية رائدة',
  intro: 'نفخر بخدمة نخبة من الجامعات والهيئات والمؤسسات في المملكة العربية السعودية.',
  logos: [
    'وزارة الحرس الوطني',
    'الأمن العام',
    'هيئة رعاية الأشخاص ذوي الإعاقة',
    'جامعة نجران',
    'جامعة أم القرى',
    'جامعة الإمام عبدالرحمن بن فيصل',
    'الكلية التطبيقية — جامعة جدة',
    'الهيئة الملكية للجبيل وينبع',
    'جمعية دعم التعليم «تعلّم»',
  ],
  testimonialQuote:
    '«لين أكاديمي منصة ذكية تجمع بين إنشاء الدورات بأنماطها المتعددة والفصول التفاعلية والشهادات الإلكترونية والتقييمات الذكية، عبر تجربة سلسة على جميع الأجهزة.»',
  testimonialAuthor: 'فريق التطوير والتدريب',
  testimonialRole: 'جهة حكومية',
};
