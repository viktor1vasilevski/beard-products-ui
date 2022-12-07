import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class OilService {

  private oilsUrl = 'https://localhost:44342/api/oils';

  constructor(private http: HttpClient) { }

  getAllOils() {
    return this.http.get(this.oilsUrl);
  }
}
