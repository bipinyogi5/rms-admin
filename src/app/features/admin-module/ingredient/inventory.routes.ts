import { Routes } from '@angular/router';

export const inventoryRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./inventory.component').then(c=>c.InventoryComponent)
}];