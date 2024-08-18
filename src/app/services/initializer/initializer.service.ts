import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentUserService } from '../current-user/current-user.service';
import { Router } from '@angular/router';
import { CustomResponse } from 'src/app/model/customResponse';
import { UserResponse } from 'src/app/model/UserResponse';
import { environment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InitializerService {
  headers: HttpHeaders;
  appInitURL: string;
  
constructor(
  private http$: HttpClient,
  private currentUser$: CurrentUserService,
  private router: Router
) { 
  this.appInitURL = `${environment.base_url}GetLoggedInUserInfo`;
}

public initApplication(): Promise<any> {
  return this.fetchInitData();
}

private fetchInitData() {
  return new Promise((resolve, reject) => {
    if (this.currentUser$.getToken() == null) {
      resolve(true);
      return;
    }
    if (localStorage.getItem('access_token') != null) {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      });
    }
    let options = { headers: this.headers };
    this.http$
      .get<CustomResponse<UserResponse>>(this.appInitURL, options)
      .pipe()
      .subscribe(
        (res) => {
          if (res.Success) {
            debugger
            this.currentUser$.setUserInfo(res.Data);
            this.router.navigateByUrl('features/admin/dashboard')
            resolve(true);
          }
        },
        (err) => {
          console.log(err);
          this.router.navigate(['/auth/login'])
          reject(false);
        }
      );
  });
}

}
