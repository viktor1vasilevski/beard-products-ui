import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-balms',
  templateUrl: './balms.component.html',
  styleUrls: ['./balms.component.css']
})
export class BalmsComponent implements OnInit {

  public isAdminLogged: Boolean = false;

  constructor(private _bannerService: BannerService, private _userService: UserService) {
    this._bannerService.toggleBanned(false);
    this._userService.isAdminLogged.subscribe((adminStatus: any) => {      
      this.manageAdmin(adminStatus);
    })
   }

  ngOnInit(): void {}

  manageAdmin(status: boolean) {
    this.isAdminLogged = status;
    this._bannerService.toggleBanned(false);
  }

}
