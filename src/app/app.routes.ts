import { Routes } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { DashboardHomePage } from './pages/dashboard/dashboard-home-page/dashboard_home.page';
import { LoginComponent } from './pages/home/login/login.component';
import { SignupComponent } from './pages/home/signup/signup.component';
import { EmailVerificationComponent } from './pages/home/email-verification/email_verification.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePage,
    outlet: 'home',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'email-verification', component: EmailVerificationComponent },
    ],
  },
  {
    path: 'dashboard',
    outlet: 'dashboard',
    children: [
      { path: '', redirectTo: 'dashboard-home', pathMatch: 'full' },
      { path: 'dashboard-home', component: DashboardHomePage },
    ],
  },
];
