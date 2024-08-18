import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class carouselService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCarousel() {
    const url = `${environment.base_url}carousels/all`;
    return this.http.get(url);
  }
  deleteCarousel(id: any) {  
    const url = `${environment.base_url}carousels/delete/${id}`;
    return this.http.delete(url);
  }
  addCarousel(data: object) {  
    const url = `${environment.base_url}carousels/create`;
    return this.http.post(url, data);
  }

}