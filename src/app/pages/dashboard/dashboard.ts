import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { ContentStore } from '../../core/content-store';
import { environment } from '@site-env/environment';
import { TopbarComponent } from './components/topbar';
import { SidebarComponent } from './components/sidebar';

/** هيكل لوحة التحكم: شريط علوي + قائمة جانبية + منفذ توجيه لصفحات الأقسام. */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, SidebarComponent],
  templateUrl: './dashboard.html',
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  protected readonly store = inject(ContentStore);

  protected readonly email = this.auth.email;
  protected readonly siteUrl = (environment as any).siteUrl || '/';

  /** حالة الدرج الجانبي على الجوال. */
  protected readonly sidebarOpen = signal(false);

  constructor() {
    void this.store.ensureLoaded();
  }

  protected async logout(): Promise<void> {
    await this.auth.signOut();
    await this.router.navigate(['/login']);
  }
}
