import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/app/environments/environment.development';
import { CategoryService } from '../category/category.service';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient, private authService:AuthService, private CategoryService:CategoryService) { }
  addFood(data: object) {  
    const url = `${environment.base_url}food-items/create-item`;
    return this.http.post(url, data);
  }
  getFood() {  
    const url = `${environment.base_url}food-items/all-items`;
    return this.http.get(url);
  }
  deleteFood(id: any) {  
    const url = `${environment.base_url}food-items/delete-item/${id}`;
    return this.http.delete(url);
  }
  updateFood(data: object, id: number) {  
    const url = `${environment.base_url}food-items/update-item/${id}`;
    return this.http.put(url, data);
  } 
}