
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    username: '',
    password: ''
  }

  public hideLoginImage: boolean = false; 

  isLoginMode = false;
  isLoadingSpinner = false;
  error: string = "";

  constructor(private _bannerService: BannerService, 
    private _authService: AuthenticationService, 
    private _userService: UserService, 
    private route: Router) {
    this._bannerService.toggleBanned(true);
   }

  ngOnInit(): void {}

  myLogin() {
    console.log(this.user);


    this._authService.login(this.user.username, this.user.password)
      .subscribe((res :any) => {
        sessionStorage.setItem('UserInfo', JSON.stringify(res));

        let userDetails = {
          username: res.userName,
          role: res.role,
          showDataStatus: true,
          token: res.token,
          userId: res.userId
        }
        this._userService.userDetails(userDetails);

        if(res.role == 'Admin') {
          this._userService.isAdminUserLogged(true);
        }
        this.route.navigate(['/soaps'])

      })
    
  }
  
  

}
