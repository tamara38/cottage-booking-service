import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cottage } from '../models/cottage';
import { CottageService } from '../services/cottage.service';
import { BookingsService } from '../services/bookings.service';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { ImageService } from '../services/image.service';
import { Prices } from '../models/prices';

@Component({
  selector: 'app-mycotagges',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './mycotagges.component.html',
  styleUrl: './mycotagges.component.css'
})
export class MycotaggesComponent implements OnInit{
  
  ngOnInit(): void {
    let x = localStorage.getItem("logged");
    if (x != null) {
      this.u = JSON.parse(x);
    } 
    this.cottageService.getMyCottages(this.u.username).subscribe(data =>{
      if(data){
        this.cottages = data;
        this.initCottages();
        
      }
      
    });
  }

  
  selectedFiles: File[] = [];
  newCottage: Cottage = new Cottage()
  
  cottages: Cottage[] = []
  u: User = new User()
  private cottageService = inject(CottageService)
  private imageService = inject(ImageService)
  private router = inject(Router)

  initCottages(): void{
    for(let i = 0; i < this.cottages.length; i++){
      this.cottages[i].pricelist = [
         { idP: 0,idC: 0, period: "Summer", price: 0, changed: false },
        { idP: 0,idC: 0, period: "Winter", price: 0, changed: false },
        { idP: 0, idC: 0, period: "Holiday", price: 0, changed: false }
      ];
      this.cottages[i].services = [];
      this.cottages[i].gallery = [];
      this.cottages[i].serviceStr = ""
      this.cottages[i].editMode = false;
    }

    for(let i = 0; i < this.cottages.length; i++){
      this.cottageService.getAllPrices(this.cottages[i].idC).subscribe(data =>{
        if(data.length > 0){
          
          this.cottages[i].pricelist = data;
        }
        
      });
      this.cottageService.getAllServices(this.cottages[i].idC).subscribe(data =>{
        if(data.length > 0){
          this.cottages[i].services = data;
          this.cottages[i].serviceStr = data.map(s => s.name).join(', ');
        }
        
      });
      this.imageService.getCottageGallery(this.cottages[i].idC).subscribe(data => {
        if(data.length > 0){
          this.cottages[i].gallery = data;
        }
        
      });
      
    }
  }


  edit(c: Cottage){
    c.editMode = true;

  }

  delete(c: Cottage){
    this.cottageService.deleteCottage(c).subscribe(data =>{
      if(data > 0){
        this.ngOnInit();
      }
    })
  }

  cancel(c: Cottage){
    this.priceChanged = false;
    this.serviceChanged = false;
    this.ngOnInit();
    c.editMode = false;
  }

  confirm(c: Cottage){
    c.editMode = !c.editMode;
    if(this.serviceChanged){
      const newNames = c.serviceStr
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

      const oldServices = c.services
      const toRemove = oldServices.filter(s => !newNames.includes(s.name));

      const oldNames = oldServices.map(s => s.name);
      const toAdd = newNames.filter(name => !oldNames.includes(name));

      for (let name of toAdd) {
        this.cottageService.insertServices(c.idC, name).subscribe(data =>{
        if(data > 0){
          this.ngOnInit();
        }
        });
      }

      for (let s of toRemove) {
        this.cottageService.deleteServices(s.idS).subscribe(data =>{
        if(data > 0){
          this.ngOnInit();
        }
        });
      }
      this.serviceChanged = false;
    }
    if(this.priceChanged){
      for(let p of c.pricelist){
        if(p.changed){
          
          p.idC = c.idC;
          alert(JSON.stringify(p));
          this.cottageService.updatePrices(p.idP,p.price).subscribe(data =>{
          if(data > 0){
            this.ngOnInit();
          }
        });
        }
        
      }
      this.priceChanged = false;
    }
    this.cottageService.updateCottage(c).subscribe(data =>{
      if(data > 0){
            this.ngOnInit();
      }
    });
    this.uploadFilesToServer(c.idC);
    
    

  }
  priceChanged = false;
  serviceChanged = false;

  priceEdited(c: Cottage,num: number){
    this.priceChanged = true;
    c.pricelist[num].changed = true;
  }

  serviceEdited(){
    this.serviceChanged = true;
  }

  add = false;
  addCottage(){
    this.add = true;
  }

  cancelAdd(){
    this.newCottage = new Cottage();
    this.add = false;
  }

  message = ""
  insert(){
    if(this.newCottage.name == "" || this.newCottage.location == "" || this.newCottage.x == 0 || this.newCottage.y == 0 ||
      this.newCottage.phone == "" || this.newCottage.pricelist[0].price == 0 ||
      this.newCottage.pricelist[1].price == 0 || this.newCottage.pricelist[2].price == 0
    ){
      this.message = "Fields missing"
      return;
    }
    if(this.selectedJson != null){
      this.uploadJsonFile();
      return;
    }
    this.newCottage.pricelist[0].period = "Summer";
    this.newCottage.pricelist[1].period = "Winter";
    this.newCottage.pricelist[2].period = "Holiday";
    
    this.newCottage.owner = this.u.username;
    this.cottageService.addCottage(this.newCottage).subscribe(data =>{
      if(data > 0){
        this.newCottage.idC = data;
        console.log(this.newCottage.idC)
        const newNames = this.newCottage.serviceStr
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);

        for(let i = 0; i < newNames.length; i++){
        this.cottageService.insertServices(this.newCottage.idC,newNames[i]).subscribe(data =>{

        });
        for(let i = 0; i < 3; i++){
          this.newCottage.pricelist[i].idC = this.newCottage.idC;
          this.cottageService.addPrices(this.newCottage.pricelist[i]).subscribe(data =>{

          })
        }
      }
      this.uploadFilesToServer(this.newCottage.idC);
      this.ngOnInit();
      this.add = false;
    }
    });
  }
      
      
  

  onFileSelected(event: Event){
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    this.selectedFiles = Array.from(input.files);
    
  } 

  deleteImg(filename: string){
    //alert(filename);
    this.imageService.deleteCottageImage(filename).subscribe({
    next: (res) => console.log(res),
    error: (err) => console.error(err)

  });
  this.ngOnInit();
  }

  uploadFilesToServer(idC: number): void{
    this.imageService.uploadCottageImages(idC, this.selectedFiles).subscribe({
    next: res => console.log('Upload ok:', res),
    error: err => console.error('Error:', err)
  });
  
  }

  selectedJson: File | null = null;
  onJsonSelected(event: Event){
    const input = event.target as HTMLInputElement; 
    if (input.files && input.files.length > 0) {
      this.selectedJson = input.files[0];
    }
  }

  uploadJsonFile() {
    if (this.selectedJson) {
      this.cottageService.uploadCottageJson(this.selectedJson).subscribe({
        
    });
  }
  }
}
