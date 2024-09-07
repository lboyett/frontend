import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'email_verification-component',
  templateUrl: './email_verification.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class EmailVerificationComponent {
  router = inject(Router);
}
