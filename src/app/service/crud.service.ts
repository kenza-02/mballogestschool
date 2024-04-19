import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  fullUrl ='http://localhost:8080/api/';
 


  constructor(private http: HttpClient) { }
  //Methode Http
  post(hote: string, gert: any) {
    const url = this.fullUrl + hote;
    return this.http.post(url, gert);
  }

  put(hote: string, gert: any, id:any) {
    const url = this.fullUrl + hote+'/' + id;
    return this.http.put(url, gert);
  }

  delete(hote: string, $id:any) {
    const url = this.fullUrl + hote+'/' + $id;
    return this.http.delete(url);
  }
  get(hote: string) {
    const url = this.fullUrl + hote;
    return this.http.get(url);
  }
  getById(hote: string, $id:any) {
    const url = this.fullUrl + hote + $id;
    return this.http.get(url);
  }

}
