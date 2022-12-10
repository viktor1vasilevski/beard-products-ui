import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  //isBannerShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  // toggleBanned(value: boolean = false) {
  //   this.isBannerShow.next(value);
  // }
}
