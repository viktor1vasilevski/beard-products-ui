import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OilService {

  private oilUrl = 'https://localhost:44342/api/oils';

  constructor(private http: HttpClient) { }

  getAllOils() {
    return this.http.get(this.oilUrl);
  }

  createEditOil(oil: any) {
    let userData;
    let userDataFromStorage = sessionStorage.getItem('UserInfo');

    if(userDataFromStorage != null) {
      userData  = JSON.parse(userDataFromStorage);
    }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    const body = { 
      id: oil.id,
      brand: oil.brand,
      scent: oil.scent,
      liquidVolume: oil.liquidVolume, 
      description: oil.description, 
      unitPrice: oil.unitPrice, 
      unitQuantity: oil.unitQuantity, 
      url: oil.url
    };
    
    return this.http.post<any>(this.oilUrl, body, { headers });
  }
}
