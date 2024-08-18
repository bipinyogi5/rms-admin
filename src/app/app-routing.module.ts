import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren:()=>
        import('./auth/auth.routes').then(r => r.authRoutes),
  },
  {
    path: 'features',
    loadChildren: ()=>
        import('./features/features.routes').then(r => r.featureRoutes)
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
