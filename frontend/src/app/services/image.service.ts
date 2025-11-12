import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor() { }

  url = 'http://localhost:8080/images';
  
  http = inject(HttpClient)
  
  getImagePath(file: File, username: string) {
    const form = new FormData();
    form.append('file', file);
    form.append('username', username);
    
    return this.http.post(`${this.url}/upload`, form, { responseType: 'text' });
  }

  getCottageGallery(idC: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/gallery/${idC}`);
  }

  uploadCottageImages(idC: number, files: File[]): Observable<string> {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }
    return this.http.post(`${this.url}/uploadCottageImages/${idC}`, formData, { responseType: 'text' });
  }

  

  deleteCottageImage(filename: string): Observable<string> {
  
  return this.http.delete(`${this.url}/deleteCottageImage`, {params: {filename: filename},  responseType: 'text' });
}



}
