/** قسم الباقات والأسعار. */

export interface Plan {
  name: string;
  tagline: string;
  /** السعر الشهري (null = حسب الطلب) */
  monthly: number | null;
  /** السعر السنوي (null = حسب الطلب) */
  annual: number | null;
  /** هل هي الباقة المميّزة */
  featured: boolean;
  /** نص زر الدعوة للإجراء */
  cta: string;
  features: string[];
}

export interface PricingContent {
  eyebrow: string;
  title: string;
  intro: string;
  monthlyLabel: string;
  annualLabel: string;
  /** شارة التوفير بجانب زر السنوي */
  saveBadge: string;
  /** شارة "الأكثر شيوعاً" على الباقة المميزة */
  featuredBadge: string;
  /** لاحقة السعر عند الاختيار السنوي */
  perYear: string;
  /** لاحقة السعر عند الاختيار الشهري */
  perMonth: string;
  /** نص السعر عند عدم وجود سعر */
  customPrice: string;
  footnotePre: string;
  footnoteLink: string;
  footnotePost: string;
  plans: Plan[];
}

export const PRICING_DEFAULT: PricingContent = {
  eyebrow: 'الباقات والأسعار',
  title: 'باقات مرنة تناسب كل مؤسسة',
  intro:
    'ابدأ بما يناسب حجمك اليوم، وارتقِ متى شئت. جميع الباقات تشمل الدعم الفني والتحديثات المستمرة.',
  monthlyLabel: 'شهرياً',
  annualLabel: 'سنوياً',
  saveBadge: 'وفّر ٢٠٪',
  featuredBadge: 'الأكثر شيوعاً',
  perYear: 'ر.س / سنوياً',
  perMonth: 'ر.س / شهرياً',
  customPrice: 'حسب الطلب',
  footnotePre: 'هل تحتاج تكاملاً خاصاً أو استضافة داخلية؟',
  footnoteLink: 'تواصل مع فريق المبيعات',
  footnotePost: 'للحصول على عرض مخصّص.',
  plans: [
    {
      name: 'الباقة الأساسية',
      tagline: 'للمراكز الناشئة والفرق الصغيرة',
      monthly: 999,
      annual: 9590,
      featured: false,
      cta: 'ابدأ الآن',
      features: [
        'حتى ٢٠٠ متدرب',
        'دورات تدريب ذاتي غير محدودة',
        'لوحة تحكم للمتدرب والمدرب',
        'نظام اختبارات وواجبات إلكترونية',
        'شهادات رقمية موثّقة',
        'دعم فني عبر البريد الإلكتروني',
      ],
    },
    {
      name: 'الباقة الاحترافية',
      tagline: 'للمعاهد والجهات متوسطة الحجم',
      monthly: 2499,
      annual: 23990,
      featured: true,
      cta: 'اطلب تجربة',
      features: [
        'حتى ٢٠٠٠ متدرب',
        'كل مزايا الباقة الأساسية',
        'فصول افتراضية مباشرة وتفاعلية',
        'أدوات الذكاء الاصطناعي للمحتوى والخطط',
        'تقارير واستبيانات متقدمة',
        'إدارة المعاهد والمراكز التدريبية',
        'دعم فني ذو أولوية على مدار الساعة',
      ],
    },
    {
      name: 'باقة المؤسسات',
      tagline: 'للجهات الحكومية والمؤسسات الكبرى',
      monthly: null,
      annual: null,
      featured: false,
      cta: 'تواصل معنا',
      features: [
        'عدد متدربين غير محدود',
        'كل مزايا الباقة الاحترافية',
        'محرّك مسارات العمل والموافقات (Workflow)',
        'تكامل وربط إلكتروني وتسجيل دخول موحّد (SSO)',
        'خيار الاستضافة الداخلية (On-premise)',
        'مدير حساب مخصّص واتفاقية مستوى خدمة (SLA)',
        'تدريب ونقل معرفة للكوادر',
      ],
    },
  ],
};
