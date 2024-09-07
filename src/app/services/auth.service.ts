import { inject, Injectable, signal } from '@angular/core';
import { UserResponse } from '../interfaces/user.interface';
import { environment } from '../../environment/environment';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSignal = signal<UserResponse | undefined | null>(undefined);
  http = inject(HttpClient);
  // if sessionid stored in browser, return user object
  // otherwise return false
  async isLoggedIn(): Promise<UserResponse | false> {
    const url = `${environment.authApiIUrl}authenticate-user/`;
    try {
      const res: HttpResponse<any> = await firstValueFrom(
        this.http.get(url, {
          withCredentials: true,
          observe: 'response',
        })
      );
      if (res.status === 200) {
        if (res.body === null || res.body === undefined) {
          throw new Error('No user returned from server');
        } else {
          return res.body as UserResponse;
        }
      } else {
        return false;
      }
    } catch (err: any) {
      return false;
    }
  }
}
