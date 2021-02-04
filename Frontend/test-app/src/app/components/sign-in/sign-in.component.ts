import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Toastr
import { ToastrService } from 'ngx-toastr';

//Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      { type: 'required', message: 'The email is required' },
      { type: 'pattern', message: 'The email does not match a valid email account' }
    ],
    password: [
      { type: 'required', message: 'The password is required' },
      { type: 'minlength', message: 'Minimum of 5 letters for password' }
    ]
  };
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(4),
      ])),
    })
  }

  ngOnInit() {}

  signIn(credentials) {
    this.loading = true;

    this.authService.signIn(credentials)
    .subscribe(Auth => {
      if (Auth.user) {
        this.toastr.success('You are welcome!');
       //Route navigation
       this.router.navigate(['administrator']);
      } else {
        this.toastr.error('Unauthorized');
      }

      this.loading = false;
    }, err => {
      if (err.error.statusCode == 401) {
        this.toastr.warning('Please try again', 'Unauthorized');
        this.loading = false;
      }
    })
  }
}
