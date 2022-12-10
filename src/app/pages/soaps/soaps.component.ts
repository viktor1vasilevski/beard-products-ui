import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { SoapService } from 'src/app/services/soap.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-soaps',
  templateUrl: './soaps.component.html',
  styleUrls: ['./soaps.component.css']
})
export class SoapsComponent implements OnInit {

  public soaps: any;
  isAdminLogged = false;

  constructor(
    private _bannerService: BannerService, 
    private _soapService: SoapService, private _userService: UserService) {
      //this._bannerService.toggleBanned(false);
      // this._userService.isAdminLogged.subscribe((adminStatus: any) => {      
      //   this.manageAdmin(adminStatus);
      // })
   }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.soaps = response.soaps;

    })
  }

  manageAdmin(status: boolean) {
    this.isAdminLogged = status;
    //this._bannerService.toggleBanned(false);
  }


  

}
