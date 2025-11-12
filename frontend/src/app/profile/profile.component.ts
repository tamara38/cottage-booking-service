import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  inputphone() {
    this.edit = true;
  }
  inputemail() {
    this.edit = true;
  }
  inputaddress() {
    this.edit = true;
  }
  inputlast() {
    this.edit = true;
  }
  inputfirst() {
    this.edit = true;
  }
  
  ngOnInit(): void {
    let x = localStorage.getItem("logged");
    if (x != null) {
      this.u = JSON.parse(x);
    }
    if(this.u.gender == 'M'){
      this.default = "img/default/m.png"
    }else{
      this.default = "img/default/f.png"
    }

    if(!this.u.prof_img){
      this.url = this.default;
    }else{
      this.url = null;
    }
  }

  private userService = inject(UsersService)
  private imageService = inject(ImageService)

  u: User = new User()
  url: String | null = null;
  default = ""
  selectedFile: File | null = null;
  selectedFileName: string = "";
  message = ""
  messagep = ""

  editProfPic(){
    if(this.selectedFile){
      this.imageService.getImagePath(this.selectedFile, this.u.username).subscribe(data =>{
        if(data){
          this.u.prof_img = data;
          this.userService.updateProfPic(this.u).subscribe(data =>{
          if(data > 0){
            this.message = "Profile picture successfully updated"
            localStorage.setItem("logged", JSON.stringify(this.u));
            this.ngOnInit();
          }
          });
        }
      });
    }
    
    
    
  }

  editFirstname(){
    this.userService.updateFirstname(this.u).subscribe(data =>{
      if(data > 0){
        this.message = "Firstname successfully updated"
        localStorage.setItem("logged", JSON.stringify(this.u));
        this.ngOnInit();
      }
    });
   
    
  }

  editLastname(){
    this.userService.updateLastname(this.u).subscribe(data =>{
      if(data > 0){
        this.message = "Lastname successfully updated"
        localStorage.setItem("logged", JSON.stringify(this.u));
        this.message = ""
        this.ngOnInit();

      }
    });
    
  }

  editAddress(){
    this.userService.updateAddress(this.u).subscribe(data =>{
      if(data > 0){
        this.message = "Address successfully updated"
        localStorage.setItem("logged", JSON.stringify(this.u));
        this.ngOnInit();
      }
    });
    
  }

  editEmail(){
    this.userService.updateEmail(this.u).subscribe(data =>{
      if(data > 0){
        this.message = "Email successfully updated"
        localStorage.setItem("logged", JSON.stringify(this.u));
        this.ngOnInit();
      }
    });
    
  }

  editPhone(){
    this.userService.updatePhone(this.u).subscribe(data =>{
      if(data > 0){
        this.message = "Phone number successfully updated"
        localStorage.setItem("logged", JSON.stringify(this.u));
        this.ngOnInit();
      }
    });
    
  }

  editCard(){
    if(!this.cardValid){
      this.message = "Invalid card number"
      return;
    }
    this.userService.updateCard(this.u).subscribe(data =>{
    if(data > 0){
      this.message = "Credit card number successfully updated"
      localStorage.setItem("logged", JSON.stringify(this.u));
      this.ngOnInit(); 
    }
    });
     
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if(!file){
      this.url = null;
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      this.messagep = "Allowed types (JPG, PNG)"
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
        this.messagep = "Image too small (Minimum 100x100px)";
        this.selectedFile = null;
        URL.revokeObjectURL(objectUrl);
        return;
      }

      if (width > 300 || height > 300) {
        this.messagep = "Image too big (Maximum 300x300px)";
        this.selectedFile = null;
        URL.revokeObjectURL(objectUrl);
        return;
      }
    }

    this.selectedFile = file;
    this.selectedFileName = file.name;
    console.log(this.selectedFileName)
    URL.revokeObjectURL(objectUrl);
    const reader = new FileReader();
    reader.onload = e => {
      this.url = e.target?.result as string;
    }
    reader.readAsDataURL(file);
  }

  cancel(){
    this.url = null;
  }

  removed = false;
  remove(){
    this.removed = !this.removed;
    this.selectedFile = null;
    this.selectedFileName = "";
    this.url = this.default;
    this.u.prof_img = ""
    this.userService.updateProfPic(this.u).subscribe(data =>{
          if(data > 0){
            //this.message = "Profile picture successfully updated"
            localStorage.setItem("logged", JSON.stringify(this.u));
            this.ngOnInit();
          }
      });
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
  this.edit = true;
    if (!card) return null;

  if (/^(300|301|302|303|36|38)/.test(card)) return 'diners';
  if (/^5[1-5]/.test(card)) return 'master';
  if (/^(4539|4556|4916|4532|4929|4485|4716)/.test(card)) return 'visa';

  return null;
  }

  edit = false;
  cancelel(){
    this.edit = false;
    this.ngOnInit();

  }

}
