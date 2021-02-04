import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Toastr
import { ToastrService } from 'ngx-toastr';

//Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  validation_messages = {
    name: [
      { type: 'required', message: 'The name is required' },
      { type: 'pattern', message: 'Only letters are allowed' }
    ],
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
    this.registerForm = this.formBuilder.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[0-9A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')
      ])),
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

  signUp(userData) {
    this.loading = true;
    this.authService.signUp(userData)
    .subscribe(data => {
      if (data.message == 'User created') {
        this.toastr.success(data.message);

       //Route navigation
       this.router.navigate(['authentication/sign-in']);
      } else {
        this.toastr.warning(data.message);
      }

      this.loading = false;
    });
  }
}
