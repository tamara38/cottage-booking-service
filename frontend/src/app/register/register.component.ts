import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../services/users.service';
import { ImageService } from '../services/image.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  selectedFile: File | null = null;
  selectedFileName = ""
  u: User = new User()
  message = ""
  private router = inject(Router)

  
  private userService = inject(UsersService)
  private imageService = inject(ImageService)

  passwordRegex = /^(?=[A-Za-z])(?=(?:.*[A-Z]))(?=(?:.*[a-z].*[a-z].*[a-z]))(?=.*\d)(?=.*[!@#$%^&*]).{6,10}$/;
  passwordValid = false;

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

  checkPassword(){
    this.passwordValid = false;
    let pass = this.u.password.replace(/\s+/g, '');
    if(this.passwordRegex.test(pass)){
      this.passwordValid = true;
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if(!input.files?.length){
      this.selectedFile = null;
      this.selectedFileName = "";
      return;
    }

    const file = input.files[0];
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.message = "Allowed types JPG, PNG";
      this.selectedFile = null;
      return;
    }

    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.src = objectUrl;

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      if (width < 100 || height < 100) {
        this.message = "Image too small (Minimum 100x100px)";
        this.selectedFile = null;
        URL.revokeObjectURL(objectUrl);
        return;
      }

      if (width > 300 || height > 300) {
        this.message = "Image too big (Maximum 300x300px)";
        this.selectedFile = null;
        URL.revokeObjectURL(objectUrl);
        return;
      }
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
    URL.revokeObjectURL(objectUrl);
  }

  register(){
    if(this.u.username == "" || 
      !this.passwordValid || 
      this.u.firstname == "" ||
      this.u.lastname == ""||
      this.u.gender == "" ||
      this.u.type == "" ||
      this.u.address == "" ||
      this.u.phone == "" ||
      this.u.email == "" ||
      !this.cardValid 
    ){
      this.message = "All fields required";
      return;
    }

    this.u.status = "pending"

    if(this.selectedFile){
      this.imageService.getImagePath(this.selectedFile, this.u.username).subscribe(data =>{
        if(data){
          this.u.prof_img = data;
          }
        this.userService.register(this.u).subscribe(res =>{
        if(res > 0){
          this.message = "Waiting for approval"
          
        }else{
          this.message = "Registration failed"
        }
      });
      });
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
