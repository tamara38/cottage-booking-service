import { Component, inject, OnInit } from '@angular/core';
import { Cottage } from '../models/cottage';
import { CottageService } from '../services/cottage.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cottages',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './cottages.component.html',
  styleUrl: './cottages.component.css'
})
export class CottagesComponent implements OnInit{
  
  ngOnInit(): void {
    this.cottages = [];
    this.cottageService.getAllCottages().subscribe(data => {
      this.cottages = data
      for(let i = 0; i < this.cottages.length; i++){
        if(this.cottages[i].baned != null){
          console.log(this.cottages[i].baned)
          let bannDate = new Date(this.cottages[i].baned);
          let now  = new Date();
          if((now.getMilliseconds() - bannDate.getMilliseconds())/(3600*1000) < 48){
            this.cottages[i].isBanned = true;
        }
        }
        
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
    localStorage.setItem("details", "details");
    this.router.navigate(['/details']);
  }
}
