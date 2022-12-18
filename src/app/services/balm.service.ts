import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BalmService {

  private balmsUrl = 'https://localhost:44342/api/balms';

  constructor(private http: HttpClient) { }

  getAllBalms() {
    return this.http.get(this.balmsUrl);
  }

  createEditBalm(soap: any) {
    let userData;
    let userDataFromStorage = sessionStorage.getItem('UserInfo');

    if(userDataFromStorage != null) {
      userData  = JSON.parse(userDataFromStorage);
    }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    const body = { 
      id: soap.id,
      volume: soap.volume, 
      brand: soap.brand, 
      description: soap.description, 
      unitPrice: soap.unitPrice, 
      unitQuantity: soap.unitQuantity, 
      url: soap.url
    };
    
    return this.http.post<any>(this.balmsUrl, body, { headers });
  }

  deleteBalm(id: any) {
    let userData;
    let userDataFromStorage = sessionStorage.getItem('UserInfo');

    if(userDataFromStorage != null) {
      userData  = JSON.parse(userDataFromStorage);
    }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    return this.http.delete<any>(`${this.balmsUrl}/${id}`, { headers });
  }
}
