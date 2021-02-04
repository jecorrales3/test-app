import { Routes } from '@angular/router';

//Layouts
import { AuthenticationComponent } from './layouts/authentication/authentication.component';
import { AdministratorComponent } from './layouts/administrator/administrator.component';

//Guards
import { AuthGuard } from './guards/auth.guard';
import { CheckAuthGuard } from './guards/check-auth.guard';

//Components
import { ErrorComponent } from './components/error/error.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'authentication',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthenticationComponent,
    //Guard
    canActivate: [CheckAuthGuard],
    children: [
      //Routes
      { path:'', redirectTo: '/sign-in', pathMatch: 'full' },
      {
        path: 'authentication',
        loadChildren: ()=> import('./modules/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '',
    component: AdministratorComponent,
    //Guard
    canActivate: [AuthGuard],
    children: [
      //Routes
      { path:'', redirectTo: '/users', pathMatch: 'full' },
      {
        path: 'administrator',
        loadChildren: ()=> import('./modules/administrator.module').then(m => m.AdministratorModule)
      }
    ]
  },
  { path: 'error', component: ErrorComponent },
  { path: '**', redirectTo: '/error' }
];
