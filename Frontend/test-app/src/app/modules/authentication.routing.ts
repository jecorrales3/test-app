import { Routes } from '@angular/router';

//Components
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';

//Detail pages

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
      {
        path: 'sign-in',
        component: SignInComponent
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  }
];
