import { Routes, RouterModule } from '@angular/router';

export const addCategory:Routes =[
  {
    path:'',
    loadComponent:()=>import('./category.component').then(c=>c.AddCategoryComponent)
}];  