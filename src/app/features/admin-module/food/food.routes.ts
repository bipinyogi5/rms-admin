import { Routes } from '@angular/router';

export const foodRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./food.component').then(c=>c.FoodComponent)
},
];  