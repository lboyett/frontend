import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../services/auth.service';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'logout-component',
  templateUrl: './logout.component.html',
  standalone: true,
  imports: [RouterLink, HlmButtonDirective],
})
export class LogoutComponent {
  router = inject(Router);
  authService = inject(AuthService);
  http = inject(HttpClient);
  cookieService = inject(CookieService);
  isLoading = false;
  async logout() {
    this.isLoading = true;
    const url = `${environment.authApiIUrl}logout/`;
    try {
      const res = firstValueFrom(this.http.get(url, { withCredentials: true }));
      this.authService.currentUserSignal.set(null);
      this.cookieService.delete('csrftoken', '/');
      this.router.navigate(['']);
    } catch (err) {
      console.log(err);
    } finally {
      this.isLoading = false;
    }
  }
}
