import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import * as L from 'leaflet';   

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});


import { Cottage } from '../models/cottage';
import { Prices } from '../models/prices';
import { Review } from '../models/review';
import { CottageService } from '../services/cottage.service';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../services/image.service';
import { routes } from '../app.routes';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { Booking } from '../models/Booking';
import { BookingsService } from '../services/bookings.service';
import { Services } from '../models/services';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit, AfterViewInit{
  
  ngAfterViewInit(): void {
    if (this.c && this.c.x != 0 && this.c.y != 0) {
    this.initMap(this.c.x, this.c.y);
  } else {
    this.message = "No coordinates found for this cottage!";
  }
  
  }

  diffTime = 0

  ngOnInit(): void {
    let x = localStorage.getItem("cottage");
    if (x != null) {
      this.c = JSON.parse(x);
      if(this.c.baned != ""){
        let bannTime = new Date(this.c.baned);
        let now = new Date();
        this.diffTime = (now.getMilliseconds() - bannTime.getMilliseconds())/(3600*1000);
      }
      
      this.cottageService.getAllServices(this.c.idC).subscribe(data => {
        this.services = data;
      });
      this.cottageService.getAllReviews(this.c.idC).subscribe(data => {
        this.reviews = data;
      });
      this.cottageService.getAllPrices(this.c.idC).subscribe(data => {
        this.pricelist = data;
      });
      this.imageService.getCottageGallery(this.c.idC).subscribe(data => {
        this.gallery = data;
      });
      let n = localStorage.getItem("logged");
      if (n != null) {
      this.u = JSON.parse(n);
      
      }
    }

  }

  private cottageService = inject(CottageService)
  private imageService = inject(ImageService) 
  private bookingService = inject(BookingsService)
  private http = inject(HttpClient)
  private router = inject(Router)
  u: User = new User()
  c: Cottage = new Cottage()
  b: Booking = new Booking()
  services: Services[] = []
  reviews: Review[] = []
  pricelist: Prices[] = []
  gallery: string[] = []
  bookings: Booking[] = []
  map! : L.Map;
  message = ""
  messagep = ""
  messager = ""
  

  private initMap(latitude: number, longitude: number): void {
    this.map = L.map('map').setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    L.marker([latitude, longitude])
      .addTo(this.map)
      .bindPopup(this.c.name)
      .openPopup();

  }

  
  step = 0
  booking = false;
  start = ""
  end = ""
  bookNow(){
    this.booking =!this.booking; 
    this.step = 1;
    this.start = this.startMin();
    this.end = this.endMax();
    this.bookingService.getAllBookings(this.c.idC).subscribe(data => {
      /*this.bookings = data.map(b => ({
        ...b,
        startDate: new Date(b.startDate),
        endDate: new Date(b.endDate)
      }));*/
    });
}
  

  cancel(){
    this.booking = !this.booking
    this.step = 0
  }

  adults = 0
  children = 0
  
  
  startMin(): string {
    let today = new Date();
    today.setHours(14, 0, 0);
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  endMax(): string{
    let today = new Date()
    today.setDate(today.getDate() + 1);
    today.setHours(10, 0, 0);
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let hours = String(today.getHours()).padStart(2, '0');
    let minutes = String(today.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  startChange(){
    this.messagep = ""
    let date = new Date(this.start);
    let hour = date.getHours();
    let minutes = date.getMinutes();
    console.log(hour)
    if (hour < 14 || (hour == 14 && minutes > 0)) {
      this.start = this.startMin();
      this.messagep = "Start time can't be before 02:00 PM";
      return;
    }
    //this.messagep = ""
  }

  endChange(){
    this.messagep = ""
    let date = new Date(this.end);
    let hour = date.getHours();
    let minutes = date.getMinutes();

    if (hour > 10 || (hour == 10 && minutes > 0)) {
      this.end = this.endMax();
      this.messagep = "End time can't be after 10:00 PM";
      return;
    }
    //this.messagep = ""
  }

  adult(){
    this.messager = ""
  }

  child(){
    this.messager = ""
  }

  proceed(){
    this.messagep = ""
    this.message = ""
    this.messager = ""
    if(this.adults == 0 && this.children == 0){
      this.messager = "Number of people field required";
      return;
    }
    if(this.adults == 0 && this.children != 0){
      this.messager = "Number of adults missing. Children alone not allowed!";
      return;
    }
    let startdt = new Date(this.start);
    let enddt = new Date(this.end);
    if(startdt >= enddt){
      this.message = "Invalid start and end date. Go back.";
      
    }
    for(let i = 0; i < this.bookings.length; i++){
      let startArray = new Date(this.bookings[i].startDate);
      let endArray = new Date(this.bookings[i].endDate);
      if((startdt >= startArray && startdt < endArray)||
         (enddt > endArray && enddt <= endArray) ||
         (startdt < endArray && enddt > startArray)){
          this.message = "Invalid dates. Cottage already booked. Go back";
          
         }
      if(startdt.getDate() == endArray.getDate() + 1){
        this.message = "Cottage now working on your selected start date. Go back";
      }
      if(enddt.getDate() == startArray.getDate() - 1){
        this.message = "Cottage now working on your selected end date. Go back"; 
      }
    }

    this.b.startDate = this.formatLocal(startdt);
    this.b.endDate = this.formatLocal(enddt);
    this.b.cottage = this.c.idC;
    this.b.user = this.u.username;
    this.b.cottage_name = this.c.name;
    let now = new Date();
    this.b.created = this.formatLocal(now);

    this.totalAmount = this.getTotalPrice() * (this.children + this.adults);
  
    this.step = 2;
  }

  formatLocal = (d: Date) => {
  const pad = (n: number) => n < 10 ? '0' + n : n;
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };
  
  editCard = false;
  change(){
    this.editCard = true;

  }

  
  confirm(){
    
    this.editCard = false
  }

  revert(){
    
    this.editCard = false
  }

  back(){
    this.totalAmount = 0
    this.step = 1;
  }

  finish(){
    this.bookingService.addBooking(this.b).subscribe(data => {
      if(data > 0){
        this.totalAmount = 0
        this.adults = 0
        this.children = 0
        this.step = 0
        this.booking = false
        
      }
    })
  }

  getSeasonPrice(season: string): number{
    let price = this.pricelist.find(x =>
      x.period.toLowerCase().includes(season.toLowerCase())
    );
    return price ? price.price : 0;
  }

  totalAmount = 0
  

  getTotalPrice(): number{
    let startdt = new Date(this.start);
    let enddt = new Date(this.end);

    let total = 0

    for (let current = startdt; current < enddt; current.setDate(current.getDate() + 1)) {
      let month = current.getMonth() + 1; 
      let day = current.getDate();

      let pricePerNight = 0

      if ((month === 12 && day >= 28) || (month === 1 && day <= 5)) {
      pricePerNight = this.getSeasonPrice("holidays");
      }
      else if (month >= 5 && month <= 8) {
      pricePerNight = this.getSeasonPrice("summer");
      }
      else {
      pricePerNight = this.getSeasonPrice("winter");
      }

      total += pricePerNight;
    }
    return total;
  }

  dinersRegex = /^((300|301|302|303)\d{12}|(36|38)\d{13})$/;
  mastercardRegex = /^(5[1-5])\d{14}$/;
  visaRegex = /^(4539|4556|4916|4532|4929|4485|4716)\d{12}$/;
  cardValid = false;
  cardType: 'diners' | 'master' | 'visa' | null = null;
  dinersPath = "img/diners.png"
  masterPath = "img/master.png"
  visaPath = "img/visa.png"

  checkCard(){
    this.cardValid = false;
    this.u.card = this.u.card.replace(/\s+/g, '');
    this.cardType = this.getCardType(this.u.card)
    
    if(this.dinersRegex.test(this.u.card) || this.mastercardRegex.test(this.u.card) || this.visaRegex.test(this.u.card)){
      this.cardValid = true;
    }
  }

  getCardType(card: string): 'diners' | 'master' | 'visa' | null {
  if (!card) return null;

  if (/^(300|301|302|303|36|38)/.test(card)) return 'diners';
  if (/^5[1-5]/.test(card)) return 'master';
  if (/^(4539|4556|4916|4532|4929|4485|4716)/.test(card)) return 'visa';

  return null;  
  }

  
}
