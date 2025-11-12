import { Component, inject, OnInit } from '@angular/core';
import { User } from '../models/user';
import { Booking } from '../models/Booking';
import { Router } from '@angular/router';
import { BookingsService } from '../services/bookings.service';
import { CottageService } from '../services/cottage.service';
import { Reservation } from '../models/reservation';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { Review } from '../models/review';

@Component({
  selector: 'app-tourist-reservation',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './tourist-reservation.component.html',
  styleUrl: './tourist-reservation.component.css'
})
export class TouristReservationComponent implements OnInit{
  ngOnInit(): void {
    let x = localStorage.getItem("logged");
    if (x != null) {
      this.u = JSON.parse(x);
    } 
    this.bookingService.getUserBookings(this.u.username).subscribe(data => {
      if(data){
        this.bookings = data;
        this.bookings.sort((a,b) =>{
          if(a.start < b.start){
            return 1;
          }
          if(a.start > b.start){
            return -1;
          }
          return 0;
       })
    
        this.initReviews();
        this.initDaysLeft();
      }
      
    });
    
    
    
  }

  u: User = new User()
  bookings: Reservation[] = []
  archived: Reservation[] = []
  ongoing: Reservation[] = []
  private cottageService = inject(CottageService)
  private bookingService = inject(BookingsService)
  private router = inject(Router)

  initReviews() : void{
    this.archived = []
    this.ongoing = []
    for(let i = 0; i < this.bookings.length; i++){
      let start = new Date(this.bookings[i].start);
      let end = new Date(this.bookings[i].end);
      let now = new Date()
      if(end < now){
        this.archived.push(this.bookings[i]);
      }else{
        this.ongoing.push(this.bookings[i]);
      }
    }
  }

  initDaysLeft() : void{
    let now = new Date();
    for(let i = 0; i < this.ongoing.length; i++){
    let curr = new Date(this.ongoing[i].start);
    this.ongoing[i].daysLeft = now.getDate() - curr.getDate();
    let diffMs = curr.getTime() - now.getTime();
    this.ongoing[i].daysLeft = diffMs / (1000 * 60 * 60 * 24);
    console.log(this.ongoing[i].daysLeft)
  }
  }
  
  review(a: Reservation){
    a.review = true;
  }

  cancel(a: Reservation){
    //a.comment = ""
    //a.rating = 0
    a.review = false
  }

  save(a: Reservation){
    //a.save = true;
    if(a.comment != null && a.rating > 0){
      a.save = true;
    }
    this.bookingService.updateReview(a).subscribe(data => {
      
      this.ngOnInit();
    })
  }

  cancelRes(o : Reservation){
    this.bookingService.deleteReservation(o).subscribe(data => {
      this.ngOnInit();
    })
  }
  
  
}
