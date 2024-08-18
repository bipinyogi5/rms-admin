import { Routes, RouterModule } from '@angular/router';

export const customerRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./customer.component').then(c=>c.CustomerComponent)
}];