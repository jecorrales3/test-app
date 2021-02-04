import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

//Toastr
import { ToastrService } from 'ngx-toastr';

//Services
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users:any;
  message:boolean = false;
  loading:boolean = true;
  moment: any = moment;
  isModalActive: boolean = false;
  //User data
  name:string;
  email:string;
  created:string;

  constructor(
    private usersService: UsersService,
  ) {
    this.getUsers();
  }

  ngOnInit(): void {
  }

  getUsers() {
    this.usersService.getUsers()
    .subscribe(Users => {
      if (Users.message == 'Users listed') {
        this.users = Users.data;
      } else {
        this.message = true;
      }
      this.loading = false;
    }, error => {
      console.log("ERROR: ", error);
    });
  }

  userDetail(user) {
    this.isModalActive = true;

    //user data
    this.name = user.name;
    this.email = user.email;
    this.created = user.created;
  }

  closeModal() {
    this.isModalActive = !this.isModalActive;
  }

}
