import { Component, inject } from '@angular/core';
import { CottageService } from '../services/cottage.service';
import { ImageService } from '../services/image.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Cottage } from '../models/cottage';
import { Services } from '../models/services';
import { Prices } from '../models/prices';
import * as L from 'leaflet';   
import { Review } from '../models/review';

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

@Component({
  selector: 'app-admindetails',
  standalone: true,
  imports: [],
  templateUrl: './admindetails.component.html',
  styleUrl: './admindetails.component.css'
})
export class AdmindetailsComponent {


  ngAfterViewInit(): void {
      if (this.c && this.c.x != 0 && this.c.y != 0) {
      this.initMap(this.c.x, this.c.y);
    } else {
      this.message = "No coordinates found for this cottage!";
    }
    
    }
  
    ngOnInit(): void {
      let x = localStorage.getItem("cottage");
      if (x != null) {
        this.c = JSON.parse(x);
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
   
    private http = inject(HttpClient)
    private router = inject(Router)
    u: User = new User()
    c: Cottage = new Cottage()
    reviews: Review[] = []
    services: Services[] = []
    
    pricelist: Prices[] = []
    gallery: string[] = []
    
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


}
