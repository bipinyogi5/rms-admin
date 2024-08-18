import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/app/environments/environment.development';
import { CategoryService } from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class FoodDetailService {

  constructor(private http: HttpClient, private authService: AuthService, private categoryService: CategoryService) { } 

  getFood(id: string) {  
    const url = `${environment.base_url}food-items/get/${id}`;
    return this.http.get<{ success: boolean, foodItem: any }>(url);
  } 
}
