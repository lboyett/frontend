import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HlmInputDirective } from '@spartan-ng/ui-input-helm';
import { HlmButtonDirective } from '@spartan-ng/ui-button-helm';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { environment } from '../../../../environment/environment';
import { UserLogin, UserResponse } from '../../../interfaces/user.interface';
import { GoogleComponent } from '../google/google.component';

@Component({
  selector: 'signup-component',
  styleUrl: './signup.component.css',
  templateUrl: './signup.component.html',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    HlmInputDirective,
    HlmButtonDirective,
    ReactiveFormsModule,
    GoogleComponent,
  ],
})
export class SignupComponent {
  fb = inject(FormBuilder);
  router = inject(Router);
  authService = inject(AuthService);
  http = inject(HttpClient);
  signupForm!: FormGroup;
  isLoading = false;
  ngOnInit() {
    this.signupForm = this.fb.group({
      email: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
      password: new FormControl(
        { value: '', disabled: false },
        Validators.required
      ),
    });
    let body = <HTMLDivElement>document.body;
    let script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }
  async onSubmit() {
    this.isLoading = true;
    const url = `${environment.authApiIUrl}signup-user/`;
    const user = this.signupForm.value;
    const formData: FormData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    const res = this.http.post<UserLogin>(url, formData, {
      withCredentials: true,
    });
    try {
      this.signupForm.get('email')?.disable();
      this.signupForm.get('password')?.disable();
      const res = await firstValueFrom(
        this.http.post<UserResponse>(url, formData, {
          withCredentials: true,
        })
      );
      this.signupForm.reset();
      this.router.navigate([{ outlets: { home: ['email-verification'] } }]);
    } catch (err) {
      console.log(err);
    } finally {
      this.signupForm.get('email')?.enable();
      this.signupForm.get('password')?.enable();
      this.isLoading = false;
    }
  }
}
