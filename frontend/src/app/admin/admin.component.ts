import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent{

  private adminService = inject(AdminService)
  private router = inject(Router)
  
  u: User = new User()
  message = ""
  
  login() {
    if (this.u.username == "" || this.u.password == "") {
      this.message = "Fill out all fields to continue";
    }
    else {
      this.adminService.adminLogin(this.u).subscribe(data => {
          if (data == null) {
            this.message = 'Invalid username or password';
          } else {
            localStorage.setItem('logged', JSON.stringify(data));
            this.router.navigate(['/manage'])
              
              
            }
          });
      }
  }
}
