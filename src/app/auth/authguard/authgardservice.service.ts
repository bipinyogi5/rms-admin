import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})

class AuthgardserviceService {
  
  constructor(
    private authService: AuthService,
    private alertify:ToastrService,
    private router: Router
  ){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if(this.authService.isUserLoggedIn()) {
      return true;
    }
    else {
      this.alertify.error("you are not logged in");
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
  
  
}
export const IsAdminGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :boolean | UrlTree =>{
  return inject(AuthgardserviceService).canActivate(route, state);
}