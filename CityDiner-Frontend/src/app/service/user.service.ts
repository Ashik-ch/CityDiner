import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LOGIN_URL, USER_REGISTER_URL } from '../constants/urls';
import { ILogin, IUserRegister } from '../shared/models/Interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(login: ILogin) {
    return this.http.post(LOGIN_URL, login)
  }

  register(register: IUserRegister) {
    return this.http.post(USER_REGISTER_URL, register)
  }

}
