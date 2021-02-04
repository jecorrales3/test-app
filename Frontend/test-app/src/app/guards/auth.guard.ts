import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs/operators';

//Toastr
import { ToastrService } from 'ngx-toastr';

//Services
import { AuthService }    from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService:AuthService,
  ) { };

  canActivate() {
    return this.authService.isLoggedIn()
    .pipe(map(Auth =>{
      const { isLoggedIn } = Auth;

      if (!isLoggedIn) {
        this.toastr.warning('Your session token has expired');
        this.router.navigate(['authentication']);
        return false;
      } else {
        return true;
      }
    }));
  }
}
