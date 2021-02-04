import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Toastr
import { ToastrService } from 'ngx-toastr';

//Services
import { AuthService }    from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  name: string = 'loading...';
  email: string = 'loading...';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService:AuthService,
  ) {
    this.getUserData();
  }

  ngOnInit(): void {
  }

  getUserData(){
    this.authService.isLoggedIn()
    .subscribe(Auth => {
      const { isLoggedIn } = Auth;

      if (!isLoggedIn) {
        this.toastr.warning('Your session token has expired');
      } else {
        this.name = Auth.user.name.split(' ')[0];
        this.email = Auth.user.email;
      }
    });
  }

  logout() {
    this.router.navigate(['authentication']);
  }

}
