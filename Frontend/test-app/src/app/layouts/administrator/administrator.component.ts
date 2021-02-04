import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Services
import { AuthService }    from '../../services/auth.service';

@Component({
  selector: 'app-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  constructor(
    private router: Router,
    private authService:AuthService,
  ) {
    this.isLoggedIn()
  }

  ngOnInit(): void {
  }

  isLoggedIn(){
    /* this.authService.isLoggedIn()
    .subscribe(Auth => {
      const { isLoggedIn } = Auth;

      if (isLoggedIn) {
        this.router.navigate(['administrator']);
      }
    }); */
  }

}
