import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userInfo = {
    username: '',
    role: '',
  };

  public totalItem : number = 0;
  showUserInfo = false;
  showLogoutButton = false;
  hideRegisterAndLoginButton = false;
  isAdminLogged = false;

  constructor(private _userService: UserService, private _authService: AuthenticationService, private _cartService: CartService) {
    this._userService.showUserInfo.subscribe((data: any) => {
      this.setUserInfo(data);   
    });
   }

  ngOnInit(): void {
    this._cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length;
    })
  }

  setUserInfo(user: any) {
    if(!user.showDataStatus) {
      return
    }
    this.showUserInfo = true
    this.userInfo.username = user.username;
    this.userInfo.role = user.role;
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
