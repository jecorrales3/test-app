import { Routes } from '@angular/router';

//Components
import { UsersComponent } from '../components/users/users.component';
import { ProfileComponent } from '../components/profile/profile.component';

//Detail pages

export const AdministratorRoutes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      }
    ]
  }
];


