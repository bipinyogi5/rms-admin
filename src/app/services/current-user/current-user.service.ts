import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment.development';
import { UserResponse } from 'src/app/model/UserResponse';
@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  constructor(private router: Router) {}

    setToken(accessToken: string, module: string = 'normal') {                         
      localStorage.setItem('module', module);
      localStorage.setItem('access_token',accessToken);
    }

  getModule():string{
    return localStorage.getItem('module');
  }

  getToken(): string {
    return localStorage.getItem('access_token')
  }
  getUserInfo(): UserResponse {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  setUserInfo(data: UserResponse) {
    localStorage.setItem('userInfo', JSON.stringify(data))
  }

  goToDashboard() {
    var mod = localStorage.getItem('module');
    var clientCode = environment.client_code;
    if (clientCode == 'kmc') {
      if (mod == 'prk') {
        this.router.navigate(['auth/parking-login']);
      } else {
        this.router.navigate(['featured/dashboard']);
      }
    } else if (clientCode == 'pbg') {
      this.router.navigate(['featured/charts']);
    } else if (clientCode == 'kmc-dc') {
      this.router.navigate(['features/category'])
    }
  }

  logout() {
    var mod = localStorage.getItem('module');
    localStorage.clear();
    localStorage.setItem('module', mod);
    var client_code = environment.client_code;

    if( client_code == "ktm-dc"){
      this.router.navigate(['/auth/login']);
    }
    location.reload();
  }
}
