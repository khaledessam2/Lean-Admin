import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { isSupabaseConfigured } from '../../core/supabase.client';
import { BrandComponent } from '../../shared/brand';
import { AlertComponent } from '../../shared/alert';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, BrandComponent, AlertComponent],
  templateUrl: './login.html',
})
export class LoginComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected email = '';
  protected password = '';
  protected readonly loading = signal(false);
  protected readonly error = signal('');
  protected readonly configured = isSupabaseConfigured();

  async submit(): Promise<void> {
    this.error.set('');
    this.loading.set(true);
    try {
      await this.auth.signIn(this.email.trim(), this.password);
      await this.router.navigate(['/']);
    } catch (err: any) {
      this.error.set('بيانات الدخول غير صحيحة، حاول مرة أخرى.');
    } finally {
      this.loading.set(false);
    }
  }
}
