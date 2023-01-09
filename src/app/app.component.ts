import { Component } from '@angular/core';
import { BannerService } from './services/banner.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public isBannerShow: boolean = false;

  constructor(private _bannerService: BannerService, private _userService: UserService) {
    this._bannerService.isBannerShow.subscribe((status: any) => {
      this.isBannerShow = status;
      
    })

    this._userService.isAdminLogged.subscribe((status: any) => {
      status ? this.isBannerShow = false : this.isBannerShow = true;
    })
  }


}
