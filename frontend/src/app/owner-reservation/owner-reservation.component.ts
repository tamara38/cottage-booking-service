import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CottageService } from '../services/cottage.service';
import { BookingsService } from '../services/bookings.service';
import { Router } from '@angular/router';
import { Booking } from '../models/Booking';
import { User } from '../models/user';
import { CommonModule, DatePipe } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core/index.js';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'app-owner-reservation',
  standalone: true,
  imports: [FormsModule, DatePipe, FullCalendarModule, CommonModule],
  templateUrl: './owner-reservation.component.html',
  styleUrl: './owner-reservation.component.css'
})
export class OwnerReservationComponent implements OnInit{

  
  ngOnInit(): void {
    let x = localStorage.getItem("logged");
    if (x != null) {
      this.u = JSON.parse(x);
    } 
    this.loadBookings();
    
  }

  showDialog = false;
  rejection = ""
  all: Booking[] = []
  pending: Booking[] = []
  completed: Booking[] = []
  b: Booking | null = null;
  u: User = new User()
  private cottageService = inject(CottageService)
  private bookingService = inject(BookingsService)
  private router = inject(Router)

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    events: [],
    eventClick: (info) => this.onEventClick(info)
  };

  
  loadBookings(): void{
    this.bookingService.getOwnerBookings(this.u.username).subscribe(data => {
      if(data){
        this.all = data;
        this.all.sort((a,b) =>{
          if(a.startDate < b.startDate){
            return 1;
          }
          if(a.startDate > b.startDate){
            return -1;
          }
          return 0;
       });
       
       this.initBookings();
       this.updateCalendarEvents();
      }
    });
  }

  updateCalendarEvents() {
    this.calendarOptions.events = [
      ...this.pending.map(r => ({
        id: r.idRes.toString(),
        title: `${r.cottage_name}`,
        start: r.startDate,
        end: r.endDate,
        color: 'yellow'
      })),
      ...this.completed.map(r => ({
        id: r.idRes.toString(),
        title: `${r.cottage_name}`,
        start: r.startDate,
        end: r.endDate,
        color: 'green'
      }))
    ];
  }

  acceptbtn = false;
  rejectbtn = false;
  showForm = false;
  message = ""

  acceptF(p: Booking){
    this.b = p;
    this.acceptbtn = true;
    this.showDialog = true;
    this.showForm = true;
    /*p.status = "completed";
    p.comment = this.rejection;
    this.bookingService.updateStatus(p).subscribe(() => {
      this.closeDialog();
      this.loadBookings();
    });*/
  }

  rejectF(p: Booking){
    this.b = p;
    this.rejectbtn = true;
    this.showDialog = true;
    this.showForm = true;
    /*p.status = "rejected";
    p.comment = this.rejection;
    this.bookingService.updateStatus(p).subscribe(() => {
      this.closeDialog();
      this.loadBookings();
    });*/
  }

  accept(){
    this.acceptbtn = true;
  }

  reject(){
    this.rejectbtn = true;
  }

  save(){
    if(this.b){
      this.b.status = this.acceptbtn ? "accepted" : "rejected";
      this.b.comment = this.rejection;
      if(this.rejectbtn && this.b.comment == ""){
        this.message = "Comment required"
        return;
      }
      this.bookingService.updateStatus(this.b).subscribe(() => {
        this.message = "";
        this.closeDialog();
        this.loadBookings();
    });
    }
    
  }

  cancel(){
    this.acceptbtn = false;
    this.rejectbtn = false;
    this.showForm = false;
  }

  initBookings() : void{
    this.pending = [];
    this.completed = [];
    for(let i = 0; i < this.all.length; i++){
      if(this.all[i].status == "pending"){
        this.pending.push(this.all[i]);
      }else if(this.all[i].status == "completed" || this.all[i].status == "accepted"){
        this.completed.push(this.all[i]);
      }else{
        continue;
      }
    }
  }

  onEventClick(info: any) {
    const resId = info.event.id;
    this.b = [...this.pending, ...this.completed].find(r => r.idRes.toString() === resId) || null;
    this.rejection = "";
    this.showDialog = true;
  }

  closeDialog() {
    this.showForm = false;
    this.showDialog = false;
    this.acceptbtn = false;
    this.rejectbtn = false;
    this.b = null;
    this.rejection = "";
  }

  clear(){
    this.message = ""
  }
}
