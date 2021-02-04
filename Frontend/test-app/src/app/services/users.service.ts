import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

//Interfaces
import { Users } from "../interfaces/users";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public getUsers() {
    const path = this.URL + `/users`
    return this.http.get<Users>(path);
  }
}
