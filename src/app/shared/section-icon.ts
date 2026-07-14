import { Component, input } from '@angular/core';

/** أيقونات خطية موحّدة للأقسام (بأسلوب Lucide). تَرِث اللون عبر currentColor. */
@Component({
  selector: 'app-section-icon',
  standalone: true,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      @switch (name()) {
        @case ('home') {
          <path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" />
        }
        @case ('layers') {
          <path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 13 9 5 9-5" />
        }
        @case ('sparkles') {
          <path d="M12 4v6M9 7h6" /><path d="M12 14v6M9 17h6" /><path d="M18 5v3M16.5 6.5h3" />
        }
        @case ('users') {
          <circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" />
          <path d="M16 5.5a3 3 0 0 1 0 5.8" /><path d="M21 20a6 6 0 0 0-4-5.6" />
        }
        @case ('chart') {
          <path d="M4 20V4M4 20h16" /><rect x="7" y="12" width="3" height="5" />
          <rect x="12" y="8" width="3" height="9" /><rect x="17" y="5" width="3" height="12" />
        }
        @case ('briefcase') {
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" />
        }
        @case ('tag') {
          <path d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Z" /><circle cx="7.5" cy="7.5" r="1.2" />
        }
        @case ('help') {
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 0 1 3.6-1.9c1.4.7 1.4 2.6 0 3.3-.7.4-1.1 1-1.1 1.8" />
          <path d="M12 17h.01" />
        }
        @case ('document') {
          <path d="M6 3h8l4 4v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <path d="M14 3v4h4M8 13h8M8 17h5" />
        }
        @case ('mail') {
          <rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" />
        }
        @case ('menu') {
          <path d="M4 6h16M4 12h16M4 18h16" />
        }
        @case ('panel') {
          <rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 15h18" />
        }
        @case ('image') {
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="8.5" cy="9" r="1.5" /><path d="m5 18 5-5 4 4 2-2 3 3" />
        }
      }
    </svg>
  `,
})
export class SectionIconComponent {
  readonly name = input.required<string>();
  readonly size = input(18);
}
