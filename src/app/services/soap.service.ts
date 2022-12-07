import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SoapService {

  private soapUrl = 'https://localhost:44342/api/soaps';

  constructor(private http: HttpClient) { }

  getAllSoaps() {
    return this.http.get(this.soapUrl);
  }

  createEditSoap(soap: any, imagePath: any) {
    let userData;
    let lsData = sessionStorage.getItem('UserInfo');

      if(lsData != null) {
        userData  = JSON.parse(lsData);
      }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    const body = { 
      id: soap.id,
      edition: soap.edition, 
      brand: soap.brand, 
      description: soap.description, 
      unitPrice: soap.unitPrice, 
      unitQuantity: soap.unitQuantity, 
      url: imagePath
    };
    debugger;
    
    return this.http.post<any>(this.soapUrl, body, { headers });
  }


  deleteSoap(id: any) {
    let userData;
    let lsData = sessionStorage.getItem('UserInfo');

      if(lsData != null) {
        userData  = JSON.parse(lsData);
      }

    const headers = { 'Authorization': `Bearer ${userData.token}` };
    
    return this.http.delete<any>(`${this.soapUrl}/${id}`, { headers });
  }




}

// private _post(endpoint: string, body: any, responseType?: any) {
//   const headers = new HttpHeaders().set(
//     'Authorization',
//     'Bearer ' + this.authService.currentUser?.access_token!
//   );
