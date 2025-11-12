import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  url = 'http://localhost:8080/users';

  http = inject(HttpClient)

  login(u: User) {
    return this.http.post<User>(`${this.url}/login`, u);
  }

  register(u: User) {
    console.log("uslo")
    return this.http.post<number>(`${this.url}/register`, u);
  }

  changePassword(username: string, oldPassword: string, newPassword: string) {
    const params = {
      username: username,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    return this.http.post<number>(`${this.url}/changePassword`,null, { params });
  }

  updateFirstname(u: User) {
    return this.http.post<number>(`${this.url}/updateFirstname`, u);
  }

  updateLastname(u: User) {
    return this.http.post<number>(`${this.url}/updateLastname`, u);
  }

  updateAddress(u: User) {
    return this.http.post<number>(`${this.url}/updateAddress`, u);
  }

  updateEmail(u: User) {
    return this.http.post<number>(`${this.url}/updateEmail`, u);
  }

  updatePhone(u: User) {
    return this.http.post<number>(`${this.url}/updatePhone`, u);
  }

  updateCard(u: User) {
    return this.http.post<number>(`${this.url}/updateCard`, u);
  }

  updateProfPic(u: User) {
    return this.http.post<number>(`${this.url}/updateProfPic`, u);
  }

  
  
}
