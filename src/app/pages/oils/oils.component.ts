import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { OilService } from 'src/app/services/oil.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-oils',
  templateUrl: './oils.component.html',
  styleUrls: ['./oils.component.css']
})
export class OilsComponent {

  isAdminLogged = false;

  constructor(private _bannerService: BannerService, 
    private _userService: UserService) {
      this._userService.isAdminLogged.subscribe((adminStatus: any) => {
        this.manageAdmin(adminStatus)
      })
    this._bannerService.toggleBanned(false);
   }

  manageAdmin(status: boolean) {
    this.isAdminLogged = status;
    this._bannerService.toggleBanned(false);
  }

}
