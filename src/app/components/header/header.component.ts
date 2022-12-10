import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo = "";
  showUserInfo = false;
  showLogoutButton = false;
  hideRegisterAndLoginButton = false;
  isAdminLogged = false;

  constructor(private _userService: UserService, private _authService: AuthenticationService) {
    this._userService.showUserInfo.subscribe((data: any) => {
      this.setUserInfo(data);   
    });
   }

  ngOnInit(): void {

  }

  setUserInfo(data: any) {
    if(!data.showDataStatus) {
      return
    }
    this.showUserInfo = true
    this.userInfo = data.username;
    this.showLogoutButton = true;
    this.hideRegisterAndLoginButton = true;
  }

  onLogout() {
    this._authService.logout().subscribe((res: any) => {
      this._userService.isAdminUserLogged(false);
      sessionStorage.removeItem('UserInfo');
      this.showLogoutButton = false;
      this.hideRegisterAndLoginButton = false;
      this.showUserInfo = false;
    })
  }



}
