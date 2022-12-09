import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ImgForceApiService {

  constructor(private http: HttpClient) { }

  myApi(result: any) {
    let body = { file: result.url.toString() }
    let headers = { 
      'Authorization' : 'Bearer '
    };

    return this.http.post<any>('https://app.imgforce.com/api/v1/image/upload', body, { headers})



  }
}
