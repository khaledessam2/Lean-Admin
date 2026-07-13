/** شريط التنقّل العلوي. */

export interface NavLink {
  label: string;
  /** المسار مثل "/" أو "/pricing" */
  route: string;
  /** جزء الصفحة (اختياري) مثل "overview" */
  fragment?: string;
}

export interface NavbarContent {
  links: NavLink[];
  /** نص زر الدعوة في الشريط */
  cta: string;
}

export const NAVBAR_DEFAULT: NavbarContent = {
  links: [
    { label: 'الرئيسية', route: '/', fragment: 'home' },
    { label: 'المنصة', route: '/', fragment: 'overview' },
    { label: 'المميزات', route: '/', fragment: 'features' },
    { label: 'المستخدمون', route: '/', fragment: 'audience' },
    { label: 'الباقات', route: '/pricing' },
    { label: 'عملاؤنا', route: '/', fragment: 'clients' },
  ],
  cta: 'اطلب عرضاً تجريبياً',
};
