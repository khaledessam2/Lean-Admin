/** ترويسة صفحة الباقات المستقلة (/pricing). */

export interface PricingPageContent {
  badge: string;
  title: string;
  intro: string;
}

export const PRICING_PAGE_DEFAULT: PricingPageContent = {
  badge: 'الباقات والأسعار',
  title: 'باقات مرنة تناسب كل مؤسسة',
  intro:
    'ابدأ بما يناسب حجمك اليوم، وارتقِ متى شئت. جميع الباقات تشمل الدعم الفني والتحديثات المستمرة.',
};
