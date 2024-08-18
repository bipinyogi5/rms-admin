import { Routes, RouterModule } from '@angular/router';

export const carouselRoutes:Routes =[
  {
    path:'',
    loadComponent:()=>import('./carousel.component').then(c=>c.CarouselComponent)
}];