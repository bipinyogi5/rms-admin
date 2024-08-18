import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient, private authService:AuthService) { }
  addCategory(data: object) {  
    const url = `${environment.base_url}categories/create-category`;
    return this.http.post(url, data);
  }
  getCategory() {  
    const url = `${environment.base_url}categories/all-category`;
    return this.http.get(url);
  }
  deleteCategory(id: any) {  
    const url = `${environment.base_url}categories/delete-category/${id}`;
    return this.http.delete(url);
  }
  updateCategory(data: object, id: number) {  
    const url = `${environment.base_url}categories/update-category/${id}`;
    return this.http.put(url, data);
  }
  
}
