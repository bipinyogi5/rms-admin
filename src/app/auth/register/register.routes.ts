import { Routes, RouterModule } from '@angular/router';

export const registerRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./register.component').then(c=>c.RegisterComponent)
}
];
 
