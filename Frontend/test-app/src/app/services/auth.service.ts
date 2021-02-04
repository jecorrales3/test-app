import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

//Interfaces
import { Request } from "../interfaces/request";
import { Auth } from '../interfaces/auth';
import { AuthConsult } from '../interfaces/auth-consult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  signIn(credentials: any) {
    const { email:username, password } = credentials;

    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(username + ':' + password)
    });

    return this.http.post<Auth>(this.URL + '/auth/sign-in', {},
    {
      headers
    });
  }

  signUp(userData: any) {
    const { name, email, password } = userData;

    return this.http.post<Request>(this.URL + "/auth/sign-up", {
      name,
      email,
      password,
    });
  }

  isLoggedIn() {
    const path = this.URL + `/auth/logged`;
    return this.http.get<AuthConsult>(path);
  }
}
