import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';
import { UserDetailsModel } from './user-details-model';
import { UserModel } from './user-model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  public user: UserModel = {
    username: '',
    password: ''
  }

  public hideLoginImage: boolean = false; 
  public isLoadingSpinner: boolean = false;
  public errorMessage: string = '';

  constructor(private _bannerService: BannerService, 
    private _authService: AuthenticationService, 
    private _userService: UserService, 
    private route: Router) {
    this._bannerService.toggleBanned(true);
   }

  ngOnInit(): void {}

  myLogin() {
    this._authService.login(this.user.username, this.user.password)
      .subscribe((res :any) => {
        this.isLoadingSpinner = true;
        this.hideLoginImage = true;

        sessionStorage.setItem('UserInfo', JSON.stringify(res));

        let userDetails : UserDetailsModel = {
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
        this.isLoadingSpinner = false;
        this.route.navigate(['/soaps'])

      }, (error: any) => {
        if(error.status == 400) {
          this.errorMessage = 'Your username or password might be incorect!';
        }
      })
    
  }
  
  manageCustomErrors() {
    this.errorMessage = '';
  }

}
