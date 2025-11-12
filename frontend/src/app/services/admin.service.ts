import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  url = 'http://localhost:8080/admin';
  
  http = inject(HttpClient)

  login(u: User) {
      return this.http.post<User>(`${this.url}/login`, u);
  }

  getAll(){
    return this.http.get<User[]>(`${this.url}/getAll`);
  }

  getAllTourists(){
    return this.http.get<User[]>(`${this.url}/getAllTourists`);
  }

  getAllOwners(){
    return this.http.get<User[]>(`${this.url}/getAllOwners`);
  }

  deleteUser(u: User){
    return this.http.post<number>(`${this.url}/deleteUser`,u);
  }

  updateStatus(u: User){
    return this.http.post<number>(`${this.url}/updateStatus`, u);
  }

  adminLogin(u: User) {
      return this.http.post<User>(`${this.url}/adminLogin`, u);
  }

  updateUser(u: User) {
      return this.http.post<number>(`${this.url}/updateUser`, u);
  }
}
