import { HttpClient } from '@angular/common/http';
import { Component, inject, Input } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { AuthService } from '../../../services/auth.service';
import { UserResponse } from '../../../interfaces/user.interface';
import { Router } from '@angular/router';

declare const google: any;

@Component({
  selector: 'google-component',
  templateUrl: './google.component.html',
  standalone: true,
})
export class GoogleComponent {
  @Input() mode = '';
  http = inject(HttpClient);
  authService = inject(AuthService);
  router = inject(Router);
  constructor() {}
  async sendTokenToServer(token: string): Promise<UserResponse | unknown> {
    const url = `${environment.authApiIUrl}google/`;
    try {
      const res = await firstValueFrom(
        this.http.post<UserResponse>(
          url,
          { token: token },
          { withCredentials: true }
        )
      );
      return res;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async handleCredentialResponse(response: any): Promise<void> {
    function instanceOfUserResponse(object: any): object is UserResponse {
      return 'email' in object;
    }
    try {
      const res = await this.sendTokenToServer(response.credential);
      console.log(res);
      if (instanceOfUserResponse(res)) {
        this.authService.currentUserSignal.set({ email: res.email });
        this.router.navigate([{ outlets: { dashboard: ['dashboard'] } }]);
      } else {
        throw new Error('response not an instance of UserResponse');
      }
    } catch (err) {
      console.log(err);
    }
  }
  ngOnInit(): void {
    (window as any)['handleCredentialResponse'] =
      this.handleCredentialResponse.bind(this);
  }
}
