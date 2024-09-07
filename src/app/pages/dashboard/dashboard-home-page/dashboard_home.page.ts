import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LogoutComponent } from '../components/logout/logout.component';

@Component({
  selector: 'dashboard-home-page',
  templateUrl: './dashboard_home.page.html',
  standalone: true,
  imports: [LogoutComponent],
})
export class DashboardHomePage {
  authService = inject(AuthService);
}
