import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class inventoryService {

  constructor(private http:HttpClient) { }
  
  getInventory() {  
    const url = `${environment.base_url}inventory`;
    return this.http.get(url);
  } 
  updateInventory(data: object, id: number) {  
    const url = `${environment.base_url}inventory/${id}`;
    return this.http.put(url, data);
  } 
  addInventory(data: object) {  
    const url = `${environment.base_url}inventory/create`;
    return this.http.post(url, data);
  }
  deleteInventory(id: string) {  
    const url = `${environment.base_url}inventory/${id}`;
    return this.http.delete(url);
  } 
}
