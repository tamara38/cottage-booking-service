import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';
import { ImageService } from '../services/image.service';

@Component({
  selector: 'app-manage',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit{
  
  ngOnInit(): void {
    this.adminService.getAll().subscribe(data =>{
      this.users = data;
      this.initUsers();
    })
  }


  u: User = new User()
  users: User[] = []
  pending: User[] = []
  tourists: User[] = []
  owners: User[] = []
  private userService = inject(UsersService)
  private adminService = inject(AdminService)
  private router = inject(Router)

  initUsers(): void{
    this.pending = [];
    this.tourists = [];
    this.owners = [];
    for(let i = 0; i < this.users.length; i++){
      this.users[i].oldUsername = this.users[i].username;
      if(this.users[i].gender == 'M'){
        this.users[i].url = "img/default/m.png"
      }else{
        this.users[i].url = "img/default/f.png"
      }
      if(this.users[i].status == "pending"){
        this.pending.push(this.users[i]);
        continue;
      }else{
        if(this.users[i].type == "tourist" && this.users[i].status != "rejected"){
          this.tourists.push(this.users[i]);
          continue;
        }
        if(this.users[i].type == "owner" && this.users[i].status != "rejected"){
          this.owners.push(this.users[i]);
          continue;
        }
      }
    }
  }

  addRegistration = false;

  add(){
    this.addRegistration = true;
  }

  accept(u: User){
    u.status = "active"
    this.adminService.updateStatus(u).subscribe(data =>{
      if(data > 0){
        this.users = [];
        this.ngOnInit();
      }
    });
  }

  reject(u: User){
    u.status = "rejected"
    this.adminService.updateStatus(u).subscribe(data =>{
      if(data > 0){
        this.users = []
        this.ngOnInit();
      }
    });
  }

  edit(u: User){
    u.editMode = !u.editMode;
  }

  delete(u: User){
    this.adminService.deleteUser(u).subscribe(data =>{
      if(data > 0){
        this.ngOnInit();
      }
    })
  }

  deactivate(u: User){
    u.status = "deactivated"
    this.adminService.updateStatus(u).subscribe(data =>{
      if(data > 0){
        this.users = []
        this.ngOnInit();
      }
    });
  }

  save(u: User){
    u.editMode = false;
    if(this.selectedFile){
      this.imageService.getImagePath(this.selectedFile, this.u.username).subscribe(data =>{
        if(data){
          this.u.prof_img = data;
        }
      });
    }
    this.adminService.updateUser(u).subscribe(data => {
      if(data > 0){
        this.ngOnInit();
      }
    })

  }

  cancelReg(){
    this.addRegistration = false;
  }

  /**********************register/****************************/
  
  selectedFile: File | null = null;
  selectedFileName = ""
    
  message = ""
  
  newUser: User = new User()
    
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
    this.newUser.card = this.newUser.card.replace(/\s+/g, '');
    this.cardType = this.getCardType(this.newUser.card)
      
    if(this.dinersRegex.test(this.newUser.card) || this.mastercardRegex.test(this.newUser.card) || this.visaRegex.test(this.newUser.card)){
      this.cardValid = true;
    }
  }
  
  checkPassword(){
    this.passwordValid = false;
    let pass = this.newUser.password.replace(/\s+/g, '');
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
    if(this.newUser.username == "" || 
      !this.passwordValid || 
      this.newUser.firstname == "" ||
      this.newUser.lastname == ""||
      this.newUser.gender == "" ||
      this.newUser.type == "" ||
      this.newUser.address == "" ||
      this.newUser.phone == "" ||
      this.newUser.email == "" ||
      !this.cardValid 
    ){
      this.message = "All fields required";
      return;
    }
  
    this.newUser.status = "pending"
  
    if(this.selectedFile){
      this.imageService.getImagePath(this.selectedFile, this.newUser.username).subscribe(data =>{
        if(data){
          this.newUser.prof_img = data;
        }
      });
      }
      this.userService.register(this.newUser).subscribe(res =>{
        if(res > 0){
          this.message = "Waiting for approval"
        }else{
          this.message = "Registration failed"
        }
      });
    }
  
  getCardType(card: string): 'diners' | 'master' | 'visa' | null {
  if (!card) return null;
  
  if (/^(300|301|302|303|36|38)/.test(card)) return 'diners';
  if (/^5[1-5]/.test(card)) return 'master';
  if (/^(4539|4556|4916|4532|4929|4485|4716)/.test(card)) return 'visa';
  
  return null;
  }


   
  }


