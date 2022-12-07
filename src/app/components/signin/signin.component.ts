
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  isLoginMode = false;
  isLoadingSpinner = false;
  error: string = "";

  constructor(private _bannerService: BannerService, 
    private _authService: AuthService, 
    private _userService: UserService, 
    private route: Router) {
    this._bannerService.toggleBanned(true);
   }

  ngOnInit(): void {
  }

  onLogin(registerData: NgForm) { 
    // if (!registerData.valid) {
    //   return
    // ova vrati go
    // }
    this.isLoadingSpinner = true;
    // const username = registerData.value.username;
    // const password = registerData.value.password;

    const username = 'Viktor';
    const password = 'Viktor@123';

    if (this.isLoginMode) {
      // ... ovde kje treba da se odlogira prvo pa posle da se logira
    } else {
      this._authService.login(username, password).subscribe((res: any) => {
        let userDetailsInfo = {
          showDataStatus: true,
          username: res.userName,
          role: res.role,
          token: res.token,
          userId: res.userId
        }

        sessionStorage.setItem('UserInfo', JSON.stringify(userDetailsInfo))

        this.isLoginMode = true;
        this._userService.userDetails(userDetailsInfo);
        let user = sessionStorage.getItem('UserInfo');
        if(user != null) {
          let ggg = JSON.parse(user);

        }

        if(userDetailsInfo.role === 'Admin') {
          this._userService.isAdminUserLogged(true);        
        }
        this.isLoadingSpinner = false;
        this.route.navigate([''])
        
      }, error => {
        this.isLoadingSpinner = false;
        this.error = 'An Error occured';

        
      })
    }

    registerData.reset();

  }
  

}
