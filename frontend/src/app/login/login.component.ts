import { Component, inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { BookingsService } from '../services/bookings.service';
import { Cottage } from '../models/cottage';
import { CottageService } from '../services/cottage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
  
  ngOnInit(): void {
    this.cottages = []
    this.registered = []
    this.tourists = []
    this.owners = []
    this.initUsers();
    
    this.bookingService.getBookings1().subscribe(data =>{
      this.last1 = data;
    })
    this.bookingService.getBookings7().subscribe(data =>{
      this.last7 = data;
    })
    this.bookingService.getBookings30().subscribe(data =>{
      this.last30 = data;
    })

    this.cottageService.getAllCottages().subscribe(data => {
        this.cottages = data
      });

    
  }

  private adminService = inject(AdminService)
  private userService = inject(UsersService)
  private bookingService = inject(BookingsService)
  private router = inject(Router)

  last1 = 0
  last7 = 0
  last30 = 0
  tmp: User[] = []
  registered: User[] = []
  tourists: User[] = []
  owners: User[] = []
  u: User = new User()
  message = ""

  login() {
    if (this.u.username == "" || this.u.password == "") {
      this.message = "Fill out all fields to continue";
    }
    else {
      this.userService.login(this.u).subscribe(data => {
          if (data == null) {
            this.message = 'Invalid username or password';
          } else {
            localStorage.setItem('logged', JSON.stringify(data));
            this.router.navigate(['/profile']);
          }
        });
    }
}

  initUsers(): void{
    this.tmp = []
    this.adminService.getAll().subscribe(data =>{
      if(data){
        this.tmp = data;
        for(let i = 0; i < this.tmp.length; i++){
          if(this.tmp[i].status == "active"){
            this.registered.push(this.tmp[i]);
          }
        }
      }
    });
    this.tmp = []
    this.adminService.getAllTourists().subscribe(data =>{
      if(data){
        this.tmp = data;
        for(let i = 0; i < this.tmp.length; i++){
          if(this.tmp[i].status == "active"){
            this.tourists.push(this.tmp[i]);
          }
        }
      }
    });
    this.tmp = []
    this.adminService.getAllOwners().subscribe(data =>{
      if(data){
        this.tmp = data;
        for(let i = 0; i < this.tmp.length; i++){
          if(this.tmp[i].status == "active"){
            this.owners.push(this.tmp[i]);
          }
        }
      }
    });
    
  }

  cottages: Cottage[] = []
  searchCotagges: Cottage[] = []
  private cottageService = inject(CottageService)
  
    
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
    
      
    
      
    
      

}
