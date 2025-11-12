import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Booking } from '../models/Booking';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {

  constructor() { }

  url = 'http://localhost:8080/bookings';
      
  http = inject(HttpClient)
    
  getAllBookings(idC: number){
    const params = {
      cottage: idC
    }
    return this.http.get<Booking[]>(`${this.url}/getAllBookings`, {params});
  }

  getAll(){
    
    return this.http.get<Booking[]>(`${this.url}/getAll`);
  }

  addBooking(b: Booking){
    return this.http.post<number>(`${this.url}/addBooking`, b);
  }

  getUserBookings(user: string){
    const params = {
      user: user
    }
    return this.http.get<Reservation[]>(`${this.url}/getUserBookings`, {params});
  }

  deleteReservation(r: Reservation){
    return this.http.post<number>(`${this.url}/deleteReservation`, r);
  }

  updateReview(r: Reservation){
    return this.http.post<number>(`${this.url}/updateReview`, r);
  }

  getOwnerBookings(owner: string){
    const params = {
      owner: owner
    }
    return this.http.get<Booking[]>(`${this.url}/getOwnerBookings`, {params});
  }

  updateStatus(b: Booking){
    return this.http.post<number>(`${this.url}/updateStatus`, b);
  }

  getBookings1(){
    return this.http.post<number>(`${this.url}/getBookings1`, null);
  }

  getBookings7(){
    return this.http.post<number>(`${this.url}/getBookings7`, null);
  }

  getBookings30(){
    return this.http.post<number>(`${this.url}/getBookings7`, null);
  }
}
