import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  public isCustomerLogged: boolean = false;

  public totalItem : number = 0;
  public showUserInfo: boolean = false;
  public showLogoutButton: boolean = false;
  public hideRegisterAndLoginButton: boolean = false;
  public isAdminLogged: boolean = false;

  constructor(private _userService: UserService, 
    private _authService: AuthenticationService, 
    private _cartService: CartService, 
    private _router: Router) {
    this._userService.showUserInfo.subscribe((data: any) => {
      this.setUserInfo(data);   
    });

    this._userService.isAdminLogged.subscribe(status => {
      this.isAdminLogged = status;
    })
   }

  ngOnInit(): void {
    this._cartService.getProducts()
    .subscribe(res => {
      this.totalItem = 0;
      res.forEach((el: any) => {
        this.totalItem += el.quantity;
      });
    })
  }

  manageCustomer(status: boolean) {
    this.isCustomerLogged = status;
  }

  setUserInfo(user: any) {
    if(!user.showDataStatus) {
      return;
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
      this._userService.isUserCustomerLogged(false);
      this._cartService.removeAllCart();
      this._router.navigate(['/']);
    })
  }



}
