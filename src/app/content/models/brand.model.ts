/** الشعار والهوية العامة (يظهر في الشريط العلوي والتذييل وقسم التواصل). */

export interface BrandContent {
  /** رابط صورة الشعار. فارغ = استخدام الشعار المرسوم الافتراضي. */
  logo: string;
  /** النص البديل للشعار. */
  alt: string;
}

export const BRAND_DEFAULT: BrandContent = {
  logo: '',
  alt: 'لين أكاديمي',
};
