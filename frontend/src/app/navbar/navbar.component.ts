import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { User } from '../models/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnChanges{
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['key']) {
      this.updateNavbar();
    }
  }
  updateNavbar(): void{
    let x = localStorage.getItem("logged");
    if (x != null) {
      this.u = JSON.parse(x);
      this.logged = true;

      if(this.u.type == "tourist"){
        this.tourist = true;
        let n = localStorage.getItem("details");
        if (n != null) {
          this.details = true;
        }//else{
        //this.details = false;
        //}
        return;
      }
      if(this.u.type == "owner"){
        this.owner = true;
        return;
      }
      this.admin = true;
      let n = localStorage.getItem("admindetails");
        if (n != null) {
          this.admindetails = true;
        }
      return;
      
      

    }else{
      this.logged = false;
      this.tourist = false;
      this.owner = false;
      this.admin = false;
    }
  }

  @Input() key: string = "";
  u: User = new User()
  private router = inject(Router)
  tourist = false;
  owner = false;
  logged = false;
  admin = false;

  logout(){
    this.logged = false;
    this.tourist = false;
    this.owner = false;
    this.details = false;
    this.admindetails = false;
    this.admin = false;
    //localStorage.removeItem("logged");
    localStorage.clear();
    this.router.navigate(['/']);
  }

  isCollapsed = true;
  toggleNavbar(){
    this.isCollapsed = !this.isCollapsed;
  }

  details = false;
  admindetails = false;
  back(){
    if(this.details){
      localStorage.removeItem("details");
      this.details = false;
      this.router.navigate(['/cottages']);
      return;
    }
    if(this.admindetails){
      localStorage.removeItem("admindetails");
      this.admindetails = false;
      this.router.navigate(['/admincottages']);
      return;
    }
  }
}
