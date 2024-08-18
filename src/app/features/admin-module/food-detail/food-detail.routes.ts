import { Routes } from '@angular/router';

export const foodDetailRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./food-detail.component').then(c=>c.FoodDetailComponent)
},
];  