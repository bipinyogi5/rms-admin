import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class dashboardService {

  constructor(private http:HttpClient) { } 

  getReports() {  
    const url = `${environment.base_url}reports`;
    return this.http.get(url);
  }
}
