import { Routes, RouterModule } from '@angular/router';

export const orderRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./order.component').then(c=>c.OrderComponent)
}];