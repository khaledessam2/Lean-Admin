import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/dashboard/dashboard').then((m) => m.DashboardComponent),
    children: [
      { path: '', redirectTo: 'hero', pathMatch: 'full' },
      { path: 'brand', loadComponent: () => import('./pages/dashboard/sections/brand/brand.page').then((m) => m.BrandPageComponent) },
      { path: 'hero', loadComponent: () => import('./pages/dashboard/sections/hero/hero.page').then((m) => m.HeroPageComponent) },
      { path: 'overview', loadComponent: () => import('./pages/dashboard/sections/overview/overview.page').then((m) => m.OverviewPageComponent) },
      { path: 'features', loadComponent: () => import('./pages/dashboard/sections/features/features.page').then((m) => m.FeaturesPageComponent) },
      { path: 'audience', loadComponent: () => import('./pages/dashboard/sections/audience/audience.page').then((m) => m.AudiencePageComponent) },
      { path: 'reports', loadComponent: () => import('./pages/dashboard/sections/reports/reports.page').then((m) => m.ReportsPageComponent) },
      { path: 'clients', loadComponent: () => import('./pages/dashboard/sections/clients/clients.page').then((m) => m.ClientsPageComponent) },
      { path: 'pricing', loadComponent: () => import('./pages/dashboard/sections/pricing/pricing.page').then((m) => m.PricingSectionPageComponent) },
      { path: 'faq', loadComponent: () => import('./pages/dashboard/sections/faq/faq.page').then((m) => m.FaqPageComponent) },
      { path: 'pricing-page', loadComponent: () => import('./pages/dashboard/sections/pricing-page/pricing-page.page').then((m) => m.PricingHeaderPageComponent) },
      { path: 'contact', loadComponent: () => import('./pages/dashboard/sections/contact/contact.page').then((m) => m.ContactPageComponent) },
      { path: 'navbar', loadComponent: () => import('./pages/dashboard/sections/navbar/navbar.page').then((m) => m.NavbarPageComponent) },
      { path: 'footer', loadComponent: () => import('./pages/dashboard/sections/footer/footer.page').then((m) => m.FooterPageComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
