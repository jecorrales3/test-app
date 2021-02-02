import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routes
import { AdministratorRoutes } from './administrator.routing';

//Components
import { UsersComponent } from '../components/users/users.component';
import { ProfileComponent } from '../components/profile/profile.component';

@NgModule({
  declarations: [
    //Components
    UsersComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdministratorRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministratorModule { }
