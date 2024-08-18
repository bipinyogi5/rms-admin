import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

public setUserSession(data:any):void{
  let accessToken = data?.access_token;
  let refreshToken = data?.refresh_token;

  this.setAccessToken(accessToken);
  this.setRefreshToken(refreshToken);
}

isUserLoggedIn():boolean{
  let token = localStorage.getItem('access_token');
  // console.log('isUserLoggedIn', token ? true : false);
  if(token) return true;
  return false;
}

public setAccessToken(accessToken:any):void{
  localStorage.setItem('access_token',accessToken);
}

public setRefreshToken(refreshToken:any):void{
  localStorage.setItem('refresh_token',refreshToken);
}

public getAccessToken():string|null{
  return localStorage.getItem('access_token');
}

public logout():void{
  localStorage.removeItem('access_token')
  // console.log('access_token removed');
}
}
