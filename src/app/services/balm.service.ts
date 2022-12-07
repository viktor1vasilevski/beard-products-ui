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
}
