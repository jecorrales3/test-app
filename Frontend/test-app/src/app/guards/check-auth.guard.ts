import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//Services
import { AuthService }    from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService:AuthService,
  ) { };

  canActivate() {
    return this.authService.isLoggedIn()
    .pipe(map(Auth =>{
      const { isLoggedIn } = Auth;
      return !isLoggedIn;
    }));
  }
}
