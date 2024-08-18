import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }


  userLogin(data:object)
  {
    let url = `${environment.base_url}users/login`;
    return this.http.post(url,data);
  } 
  

}
