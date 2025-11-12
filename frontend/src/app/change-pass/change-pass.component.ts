import { Component, inject } from '@angular/core';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-pass',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './change-pass.component.html',
  styleUrl: './change-pass.component.css'
})
export class ChangePassComponent {

  u: User = new User()
  private userService = inject(UsersService)
  private router = inject(Router)
  message = ""

  passwordValid = false;
  passwordRegex = /^(?=[A-Za-z])(?=(?:.*[A-Z]))(?=(?:.*[a-z].*[a-z].*[a-z]))(?=.*\d)(?=.*[!@#$%^&*]).{6,10}$/;
  confirmPassword = ""
  newPassword = ""
  match = false;

  checkMatching(){
    this.match = false;
    if (this.u.password === this.confirmPassword) {
      this.match = true;
    }else {
      this.match = false;
    }
  }

  checkPassword(){
    this.passwordValid = false;
    let pass = this.newPassword.replace(/\s+/g, '');
    if(this.passwordRegex.test(pass)){
      this.passwordValid = true;
    }
  }

  changePassword(){
    if(this.u.username == "" || this.u.password == "" || !this.match || !this.passwordValid){
      this.message = "All fileds required"
      return;
    }
    this.userService.changePassword(this.u.username, this.u.password, this.newPassword).subscribe(data =>{
      if(data > 0){
        this.router.navigate(['']);
      }else{
        this.message = "Invalid username or password"
      }
    })

  }
}
