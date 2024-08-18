import { Routes, RouterModule } from '@angular/router';

export const forgetpwdRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./forgetpwd.component').then((c) => c.ForgetpwdComponent),
  },
];