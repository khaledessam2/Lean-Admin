import { Component, computed, inject, input, output } from '@angular/core';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, startWith } from 'rxjs';
import { sectionBySlug } from '../../../editor/section-meta';

/** الشريط العلوي بأسلوب Poseidon: مسار التنقّل + أدوات المستخدم. */
@Component({
  selector: 'app-topbar',
  standalone: true,
  template: `
    <header
      class="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-line
             bg-white/85 px-4 backdrop-blur md:px-6"
    >
      <!-- يسار: القائمة (جوال) + رجوع + المسار -->
      <div class="flex items-center gap-2">
        <button type="button" class="icon-btn md:hidden" (click)="toggleMenu.emit()" title="القائمة">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <button type="button" class="icon-btn" (click)="back()" title="رجوع">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 6 6 6-6 6" />
          </svg>
        </button>

        <nav class="flex items-center gap-2 text-sm">
          <span class="font-bold text-navy-600">المحتوى</span>
          <span class="text-navy-600/50">/</span>
          <span class="font-extrabold text-navy">{{ section()?.label ?? 'لوحة التحكم' }}</span>
        </nav>
      </div>

      <!-- يمين: أدوات -->
      <div class="flex items-center gap-1">
        <button type="button" class="icon-btn" title="بحث">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
        </button>

        <a [href]="siteUrl()" target="_blank" rel="noopener" class="icon-btn" title="معاينة الموقع">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>

        <button type="button" class="icon-btn" title="الإشعارات">
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>
          <span class="absolute end-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </button>

        <div class="mx-1 h-7 w-px bg-line"></div>

        <div class="flex items-center gap-2.5 ps-1">
          <span
            class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-700
                   text-sm font-extrabold text-white"
            [title]="email() || ''"
          >
            {{ initial() }}
          </span>
          <button type="button" class="btn-ghost btn-sm hidden sm:inline-flex" (click)="logout.emit()">
            خروج
          </button>
        </div>
      </div>
    </header>
  `,
})
export class TopbarComponent {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  readonly email = input<string | undefined>('');
  readonly siteUrl = input('/');
  readonly logout = output<void>();
  readonly toggleMenu = output<void>();

  /** القسم الحالي مشتقٌّ من المسار. */
  protected readonly section = toSignal(
    this.router.events.pipe(
      filter((e) => e instanceof NavigationEnd),
      map(() => this.lookup()),
      startWith(this.lookup()),
    ),
    { initialValue: this.lookup() },
  );

  protected readonly initial = computed(() => (this.email()?.trim()?.[0] ?? '؟').toUpperCase());

  private lookup() {
    const slug = this.router.url.split('?')[0].split('#')[0].replace(/^\//, '');
    return sectionBySlug(slug);
  }

  protected back(): void {
    this.location.back();
  }
}
