/** تذييل الصفحة. */

export interface FooterLink {
  label: string;
  route: string;
  fragment?: string;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  /** اسم المنصة (يحدّد الأيقونة): Facebook / X / Instagram / LinkedIn */
  label: string;
  href: string;
}

export interface BottomLink {
  label: string;
  href: string;
}

export interface FooterContent {
  /** النص التعريفي تحت الشعار */
  blurb: string;
  socials: SocialLink[];
  columns: FooterColumn[];
  /** نص حقوق النشر (بعد السنة) */
  copyright: string;
  /** السنة */
  year: number;
  /** روابط أسفل التذييل */
  bottomLinks: BottomLink[];
}

export const FOOTER_DEFAULT: FooterContent = {
  blurb: 'نظام لين الأكاديمي الإلكتروني — منصة متكاملة لتمكين النمو عبر التعليم والتدريب الذكي.',
  socials: [
    { label: 'Facebook', href: '#' },
    { label: 'X', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
  columns: [
    {
      title: 'المنصة',
      links: [
        { label: 'نظرة عامة', route: '/', fragment: 'overview' },
        { label: 'المميزات', route: '/', fragment: 'features' },
        { label: 'المستخدمون', route: '/', fragment: 'audience' },
        { label: 'التقارير', route: '/', fragment: 'reports' },
      ],
    },
    {
      title: 'الباقات',
      links: [
        { label: 'الأسعار', route: '/pricing' },
        { label: 'الباقة الأساسية', route: '/pricing' },
        { label: 'الباقة الاحترافية', route: '/pricing' },
        { label: 'باقة المؤسسات', route: '/pricing' },
      ],
    },
    {
      title: 'تواصل',
      links: [
        { label: 'اطلب عرضاً تجريبياً', route: '/', fragment: 'contact' },
        { label: 'الدعم الفني', route: '/', fragment: 'contact' },
        { label: 'leansolutions.com.sa', route: '/' },
      ],
    },
  ],
  copyright: 'لين أكاديمي. جميع الحقوق محفوظة.',
  year: 2026,
  bottomLinks: [
    { label: 'سياسة الخصوصية', href: '#' },
    { label: 'الشروط والأحكام', href: '#' },
  ],
};
