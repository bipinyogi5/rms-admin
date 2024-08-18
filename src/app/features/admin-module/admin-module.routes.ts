import { Routes } from '@angular/router';
import { AdminModuleComponent } from './admin-module.component';

export const AdminModuleRoutes: Routes = [
  {
    path: '',
    component: AdminModuleComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
      },
      {
        path: 'add_category',
        loadChildren: () =>
          import('./category/addCategory.routes').then((r) => r.addCategory),
      },
      {
        path: 'customer',
        loadChildren: () =>
          import('./customer/customer.routes').then((r) => r.customerRoutes),
      },
      {
        path: 'food',
        loadChildren: () => import('./food/food.routes').then(r => r.foodRoutes)
      },
      {
        path: 'ingredients', 
        loadChildren: () => import('./ingredient/inventory.routes').then(r => r.inventoryRoutes)
      },
      {
        path: 'food-detail', 
        loadChildren: () => import('./food-detail/food-detail.routes').then(r => r.foodDetailRoutes)
      },
      {
        path: 'order',
        loadChildren: () =>
          import('./order/order.routes').then((r) => r.orderRoutes),
      },
      {
        path: 'editCarousel',
        loadChildren: () =>
          import('./carousel/carousel.routes').then((r) => r.carouselRoutes),
      },  
    ],
  }
];
