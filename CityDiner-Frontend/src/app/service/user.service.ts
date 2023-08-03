import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_URL } from '../constants/urls';
import { Login } from '../shared/models/food';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(login: any) {
    return this.http.post(LOGIN_URL, login)
  }
}
