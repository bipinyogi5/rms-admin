import { Routes } from '@angular/router';

export const dynamicRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./dynamic-table.component').then(c=>c.DynamicTableComponent)
}];