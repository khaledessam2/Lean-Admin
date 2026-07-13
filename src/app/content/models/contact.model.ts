/** قسم التواصل + نموذج طلب العرض التجريبي. */

export type ContactType = 'web' | 'mail' | 'phone';

export interface ContactItem {
  /** نوع وسيلة التواصل (يحدد الأيقونة) */
  type: ContactType;
  label: string;
  value: string;
}

export interface ContactContent {
  title: string;
  intro: string;
  contacts: ContactItem[];
  nameLabel: string;
  namePlaceholder: string;
  orgLabel: string;
  orgPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  privacyNote: string;
  successTitle: string;
  successText: string;
  successAgain: string;
}

export const CONTACT_DEFAULT: ContactContent = {
  title: 'جاهز لتمكين النمو في مؤسستك؟',
  intro: 'احجز عرضاً تجريبياً مجانياً وسيتواصل معك فريقنا لتصميم الحل الأنسب لاحتياجات جهتك.',
  contacts: [
    { type: 'web', label: 'الموقع الإلكتروني', value: 'leansolutions.com.sa' },
    { type: 'mail', label: 'البريد الإلكتروني', value: 'khaledessam3000@gmail.com' },
    { type: 'phone', label: 'خدمة العملاء', value: '٩٢٠ ٠٠٠ ٠٠٠' },
  ],
  nameLabel: 'الاسم الكامل',
  namePlaceholder: 'أدخل اسمك',
  orgLabel: 'جهة العمل',
  orgPlaceholder: 'اسم المؤسسة',
  emailLabel: 'البريد الإلكتروني',
  emailPlaceholder: 'name@example.com',
  messageLabel: 'كيف يمكننا مساعدتك؟',
  messagePlaceholder: 'اكتب رسالتك هنا…',
  submitLabel: 'إرسال الطلب',
  sendingLabel: 'جارٍ الإرسال…',
  privacyNote: 'بإرسالك الطلب فأنت توافق على سياسة الخصوصية.',
  successTitle: 'تم استلام طلبك بنجاح!',
  successText: 'سيتواصل معك فريق لين أكاديمي في أقرب وقت.',
  successAgain: 'إرسال طلب آخر',
};
