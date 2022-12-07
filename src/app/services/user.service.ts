import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface User {
  userName: string;
  userRole: string;
  userStatus: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  showUserInfo : BehaviorSubject<Object> = new BehaviorSubject<Object>({showDataStatus: false, username: "", role: "", token: "", userId: ""});
  isAdminLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  userDetails(value: any) {
    this.showUserInfo.next(value);
  }

  isAdminUserLogged(value: boolean = false) {
    this.isAdminLogged.next(value);
  }

}
