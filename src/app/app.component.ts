import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HlmSpinnerComponent } from '../../components/ui-spinner-helm/src/lib/hlm-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HomePage, HlmSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';
  isLoading = false;
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  async ngOnInit() {
    this.isLoading = true;
    try {
      const res = await this.authService.isLoggedIn();
      if (res) {
        this.authService.currentUserSignal.set(res);
        this.router.navigate([
          { outlets: { dashboard: ['dashboard', 'dashboard-home'] } },
        ]);
      } else {
        this.authService.currentUserSignal.set(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }
}
