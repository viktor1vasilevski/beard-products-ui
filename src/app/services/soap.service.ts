import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private soapUrl = 'https://localhost:44342/api/soaps';

  constructor(private http: HttpClient) { }

  getAllSoaps() {
    return this.http.get(this.soapUrl);
  }

  createEditSoap(soap: any) {
    let userData;
    let userDataFromStorage = sessionStorage.getItem('UserInfo');

    if(userDataFromStorage != null) {
      userData  = JSON.parse(userDataFromStorage);
    }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    const body = { 
      id: soap.id,
      edition: soap.edition, 
      brand: soap.brand, 
      description: soap.description, 
      unitPrice: soap.unitPrice, 
      unitQuantity: soap.unitQuantity, 
      url: soap.url
    };
    
    return this.http.post<any>(this.soapUrl, body, { headers });
  }


  deleteSoap(id: any) {
    let userData;
    let userDataFromStorage = sessionStorage.getItem('UserInfo');
    if(userDataFromStorage != null) {
      userData  = JSON.parse(userDataFromStorage);
    }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    return this.http.delete<any>(`${this.soapUrl}/${id}`, { headers });
  }




}
