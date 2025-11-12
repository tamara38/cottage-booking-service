import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cottage } from '../models/cottage';
import { Review } from '../models/review';
import { Prices } from '../models/prices';
import { Services } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class CottageService {

  constructor() { }

  url = 'http://localhost:8080/cottages';
    
  http = inject(HttpClient)
  
  getAllCottages(){
    return this.http.get<Cottage[]>(`${this.url}/getAllCottages`);
  }

  getAllServices(cottage: number){
    const params = {
      cottage: cottage
    };
    return this.http.get<Services[]>(`${this.url}/getAllServices`, {params});
  }

  getAllReviews(cottage: number){
    const params = {
      cottage: cottage
    };
    return this.http.get<Review[]>(`${this.url}/getAllReviews`, {params});
  }

  getAllPrices(cottage: number){
    const params = {
      cottage: cottage
    };
    return this.http.get<Prices[]>(`${this.url}/getAllPrices`, {params});
  }

  getMyCottages(owner: string){
    const params = {
      owner: owner
    };
    return this.http.get<Cottage[]>(`${this.url}/getMyCottages`, {params});
  }

  deleteCottage(c: Cottage){
    return this.http.post<number>(`${this.url}/deleteCottage`, c);
  }

  updateCottage(c: Cottage){
    return this.http.post<number>(`${this.url}/updateCottage`, c);
  }

  updatePrices(idP: number, price: number){
    const params = {
      idP: idP,
      price: price
    };
    return this.http.post<number>(`${this.url}/updatePrices`,null, {params});
  }

  insertServices(idC: number, name: string){
    const params = {
      idC: idC,
      name: name
    };
    return this.http.post<number>(`${this.url}/insertServices`,null,  {params});
  }

  deleteServices(idS: number){
    const params = {
      idS: idS
    };
    return this.http.post<number>(`${this.url}/deleteServices`,null, {params});
  }

  addCottage(c: Cottage){
    return this.http.post<number>(`${this.url}/addCottage`,c);
  }

  addPrices(p: Prices){
    return this.http.post<number>(`${this.url}/addPrices`,p);
  }

  uploadCottageJson(file: File){
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.url}/upload`, formData);
  }

  getBanedReviews(c: Cottage){
    return this.http.post<boolean>(`${this.url}/getBanedReviews`,c);
  }

  banCottage(c: Cottage){
    return this.http.post<number>(`${this.url}/banCottage`,c);
  }

}
