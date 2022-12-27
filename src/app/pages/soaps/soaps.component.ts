import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-soaps',
  templateUrl: './soaps.component.html',
  styleUrls: ['./soaps.component.css']
})
export class SoapsComponent {

  isAdminLogged = false;

  constructor(private _bannerService: BannerService, private _userService: UserService) {
      this._bannerService.toggleBanned(false);
      this._userService.isAdminLogged.subscribe((adminStatus: any) => {      
        this.manageAdmin(adminStatus);
      })
   }

  manageAdmin(status: boolean) {
    this.isAdminLogged = status;
    this._bannerService.toggleBanned(false);
  }
}
