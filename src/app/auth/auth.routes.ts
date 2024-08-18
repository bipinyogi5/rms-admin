import { Routes } from '@angular/router';
import { AuthComponent } from './auth.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./login/login.routes').then((r) => r.loginRoutes),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./register/register.routes').then((r) => r.registerRoutes),
      },
      {
        path: 'forgetpwd',
        loadChildren: () =>
          import('./forgetpwd/forgetpwd.routes').then((r) => r.forgetpwdRoutes),
      },
    ],
  },
];
