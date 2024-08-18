import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class registerService {

constructor(private http:HttpClient) { }

register(data:object) {
  // let url = "http://0.tcp.in.ngrok.io:16976/users/register";
  let url = `${environment.base_url}users/register` 
  return this.http.post(url,data);
}

}
