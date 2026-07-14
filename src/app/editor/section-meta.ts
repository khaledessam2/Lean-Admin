import { SECTION_ORDER, SectionKey } from '@site/content/site-content';

/** بيانات وصفية لكل قسم: المسار، الأيقونة، ووصف مختصر يظهر أعلى المحرّر. */
export interface SectionMeta {
  /** المعرّف في المسار (URL). */
  slug: string;
  /** اسم الأيقونة (انظر SectionIconComponent). */
  icon: string;
  /** وصف قصير يشرح دور القسم. */
  description: string;
}

export const SECTION_META: Record<SectionKey, SectionMeta> = {
  brand: {
    slug: 'brand',
    icon: 'image',
    description: 'شعار الموقع: ارفع صورة الشعار لتظهر في الشريط العلوي والتذييل وقسم التواصل.',
  },
  hero: {
    slug: 'hero',
    icon: 'home',
    description: 'أول ما يراه الزائر: العنوان الرئيسي، الفقرة التعريفية، وأزرار الدعوة.',
  },
  overview: {
    slug: 'overview',
    icon: 'layers',
    description: 'نبذة عامة عن أنماط التدريب ولافتة الذكاء الاصطناعي.',
  },
  features: {
    slug: 'features',
    icon: 'sparkles',
    description: 'قائمة المميزات الرئيسية التي تُبرز قيمة المنصّة.',
  },
  audience: {
    slug: 'audience',
    icon: 'users',
    description: 'الفئات المستهدفة وأدوارها والنقاط الخاصة بكل دور.',
  },
  reports: {
    slug: 'reports',
    icon: 'chart',
    description: 'قسم التقارير: الإحصائيات وأعمدة المخطط وأنواع التقارير.',
  },
  clients: {
    slug: 'clients',
    icon: 'briefcase',
    description: 'الجهات المتعاملة وشهادات العملاء.',
  },
  pricing: {
    slug: 'pricing',
    icon: 'tag',
    description: 'الباقات وأسعارها ومزاياها ونصوص التبديل بين الشهري والسنوي.',
  },
  faq: {
    slug: 'faq',
    icon: 'help',
    description: 'الأسئلة الشائعة وإجاباتها.',
  },
  pricingPage: {
    slug: 'pricing-page',
    icon: 'document',
    description: 'ترويسة صفحة الباقات المستقلّة (الشارة والعنوان والمقدّمة).',
  },
  contact: {
    slug: 'contact',
    icon: 'mail',
    description: 'وسائل التواصل ونصوص نموذج المراسلة.',
  },
  navbar: {
    slug: 'navbar',
    icon: 'menu',
    description: 'روابط شريط التنقّل العلوي وزر الدعوة.',
  },
  footer: {
    slug: 'footer',
    icon: 'panel',
    description: 'محتوى التذييل: النبذة، الروابط، وسائل التواصل، وحقوق النشر.',
  },
};

/** قائمة الأقسام كاملة (مفتاح + تسمية + بيانات وصفية) بالترتيب. */
export interface SectionEntry extends SectionMeta {
  key: SectionKey;
  label: string;
}

export const SECTIONS: SectionEntry[] = SECTION_ORDER.map((s) => ({
  key: s.key,
  label: s.label,
  ...SECTION_META[s.key],
}));

/** البحث عن قسم بواسطة مساره. */
export function sectionBySlug(slug: string): SectionEntry | undefined {
  return SECTIONS.find((s) => s.slug === slug);
}
