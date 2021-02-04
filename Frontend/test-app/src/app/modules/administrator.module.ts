import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Routes
import { AdministratorRoutes } from './administrator.routing';

//Components
import { UsersComponent } from '../components/users/users.component';

@NgModule({
  declarations: [
    //Components
    UsersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdministratorRoutes),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdministratorModule { }
