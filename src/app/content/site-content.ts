/**
 * يجمّع كل نماذج الأقسام في نموذج واحد للموقع كامل + المحتوى الافتراضي + دالة الدمج.
 * هذا الملف لا يعتمد على Angular حتى يمكن مشاركته مع تطبيق الأدمن.
 */
import { HeroContent, HERO_DEFAULT } from './models/hero.model';
import { OverviewContent, OVERVIEW_DEFAULT } from './models/overview.model';
import { FeaturesContent, FEATURES_DEFAULT } from './models/features.model';
import { AudienceContent, AUDIENCE_DEFAULT } from './models/audience.model';
import { ReportsContent, REPORTS_DEFAULT } from './models/reports.model';
import { ClientsContent, CLIENTS_DEFAULT } from './models/clients.model';
import { PricingContent, PRICING_DEFAULT } from './models/pricing.model';
import { FaqContent, FAQ_DEFAULT } from './models/faq.model';
import { PricingPageContent, PRICING_PAGE_DEFAULT } from './models/pricing-page.model';
import { ContactContent, CONTACT_DEFAULT } from './models/contact.model';
import { NavbarContent, NAVBAR_DEFAULT } from './models/navbar.model';
import { FooterContent, FOOTER_DEFAULT } from './models/footer.model';

/** الشكل الكامل لمحتوى الموقع. كل مفتاح = قسم = صف في جدول site_content. */
export interface SiteContent {
  hero: HeroContent;
  overview: OverviewContent;
  features: FeaturesContent;
  audience: AudienceContent;
  reports: ReportsContent;
  clients: ClientsContent;
  pricing: PricingContent;
  faq: FaqContent;
  pricingPage: PricingPageContent;
  contact: ContactContent;
  navbar: NavbarContent;
  footer: FooterContent;
}

export type SectionKey = keyof SiteContent;

/** ترتيب الأقسام كما تظهر في لوحة الأدمن + عنوان عربي لكل قسم. */
export const SECTION_ORDER: { key: SectionKey; label: string }[] = [
  { key: 'hero', label: 'الواجهة الرئيسية' },
  { key: 'overview', label: 'نظرة عامة' },
  { key: 'features', label: 'المميزات' },
  { key: 'audience', label: 'المستخدمون' },
  { key: 'reports', label: 'التقارير' },
  { key: 'clients', label: 'العملاء' },
  { key: 'pricing', label: 'الباقات' },
  { key: 'faq', label: 'الأسئلة الشائعة' },
  { key: 'pricingPage', label: 'ترويسة صفحة الباقات' },
  { key: 'contact', label: 'التواصل' },
  { key: 'navbar', label: 'شريط التنقّل' },
  { key: 'footer', label: 'التذييل' },
];

export const DEFAULT_CONTENT: SiteContent = {
  hero: HERO_DEFAULT,
  overview: OVERVIEW_DEFAULT,
  features: FEATURES_DEFAULT,
  audience: AUDIENCE_DEFAULT,
  reports: REPORTS_DEFAULT,
  clients: CLIENTS_DEFAULT,
  pricing: PRICING_DEFAULT,
  faq: FAQ_DEFAULT,
  pricingPage: PRICING_PAGE_DEFAULT,
  contact: CONTACT_DEFAULT,
  navbar: NAVBAR_DEFAULT,
  footer: FOOTER_DEFAULT,
};

/**
 * يدمج الأقسام المخزّنة (من قاعدة البيانات) فوق المحتوى الافتراضي.
 * القسم المخزّن يستبدل القسم الافتراضي بالكامل، والأقسام الناقصة تبقى على الافتراضي.
 */
export function mergeContent(
  overrides: Partial<Record<SectionKey, unknown>> | null | undefined,
): SiteContent {
  const result = structuredClone(DEFAULT_CONTENT) as SiteContent;
  if (!overrides) return result;
  const bag = result as unknown as Record<string, Record<string, unknown>>;
  for (const key of Object.keys(overrides) as SectionKey[]) {
    const value = overrides[key];
    if (value != null && typeof value === 'object' && !Array.isArray(value)) {
      // دمج على مستوى الحقول: الحقول المخزّنة تفوز، والناقصة تأخذ الافتراضي
      bag[key] = {
        ...bag[key],
        ...(value as Record<string, unknown>),
      };
    }
  }
  return result;
}

// إعادة تصدير كل الأنواع لسهولة الاستيراد من مكان واحد
export * from './models/icon.model';
export * from './models/hero.model';
export * from './models/overview.model';
export * from './models/features.model';
export * from './models/audience.model';
export * from './models/reports.model';
export * from './models/clients.model';
export * from './models/pricing.model';
export * from './models/faq.model';
export * from './models/pricing-page.model';
export * from './models/contact.model';
export * from './models/navbar.model';
export * from './models/footer.model';
