import { Component, inject } from '@angular/core';
import { Cottage } from '../models/cottage';
import { Router } from '@angular/router';
import { CottageService } from '../services/cottage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-admincottages',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './admincottages.component.html',
  styleUrl: './admincottages.component.css'
})
export class AdmincottagesComponent {

  ngOnInit(): void {
      this.cottageService.getAllCottages().subscribe(data => {
        this.cottages = data
        for(let i = 0; i < this.cottages.length; i++){
          this.cottageService.getBanedReviews(this.cottages[i]).subscribe(data =>{
            this.cottages[i].toBan = data;
          })
        }
      });
    }
  
  cottages: Cottage[] = []
  searchCotagges: Cottage[] = []
  private cottageService = inject(CottageService)
  private router = inject(Router)
  
  name = ""
  location = ""
  nameAsc = false;
  locationAsc = false;
    
  
    search(){
      if(this.name != ""){
        this.cottages = this.cottages.filter(c =>
          c.name.toLowerCase().includes(this.name.toLowerCase())
        )
      }else{
        if(this.location != ""){
          this.cottages = this.cottages.filter(c =>
          c.location.toLowerCase().includes(this.location.toLowerCase())
          )
        }else{
          return;
        }
      }
    }
  
    reset(){
      this.name = ""
      this.location = ""
      this.ngOnInit();
    }
  
    sortName(){
      this.nameAsc = !this.nameAsc
      if(this.nameAsc){
        this.cottages.sort((a,b) =>{
          if(a.name < b.name){
            return -1;
          }
          if(a.name > b.name){
           return 1;
          }
          return 0;
        })
      }else{
        this.cottages.sort((a,b) =>{
          if(a.name < b.name){
            return 1;
          }
          if(a.name > b.name){
           return -1;
          }
          return 0;
        })
      }
    }
  
    sortLocation(){
      this.locationAsc = !this.locationAsc
      if(this.locationAsc){
        this.cottages.sort((a,b) =>{
          if(a.location < b.location){
            return -1;
          }
          if(a.location > b.location){
           return 1;
          }
          return 0;
        })
      }else{
        this.cottages.sort((a,b) =>{
          if(a.location < b.location){
            return 1;
          }
          if(a.location > b.location){
           return -1;
          }
          return 0;
        })
      }
    }
  
    cottageId = 0
  
    show(c: Cottage){
      this.cottageId = c.idC
    }
  
    goDetails(c: Cottage){
      this.cottageId = 0
      localStorage.setItem("cottage", JSON.stringify(c));
      localStorage.setItem("admindetails", "details");
      this.router.navigate(['/admindetails']);
    }

    formatLocal = (d: Date) => {
      const pad = (n: number) => n < 10 ? '0' + n : n;
      return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    };

    forbid(c: Cottage){
      let now = new Date();
      c.baned = this.formatLocal(now);
      
      this.cottageService.banCottage(c).subscribe(data => {

      });
    }

    
}
