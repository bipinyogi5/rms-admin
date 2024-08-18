import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  
  getOrder() {  
    const url = `${environment.base_url}orders`;
    return this.http.get(url);
  } 
  updateStatus(data: object) {  
    const url = `${environment.base_url}orders/update-status`;
    return this.http.put(url, data);
  }
}
