import { Routes } from '@angular/router';

//Components
import { UsersComponent } from '../components/users/users.component';

export const AdministratorRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent
      }
    ]
  }
];


