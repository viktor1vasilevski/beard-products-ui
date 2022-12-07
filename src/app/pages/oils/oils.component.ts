import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';
import { OilService } from 'src/app/services/oil.service';

@Component({
  selector: 'app-oils',
  templateUrl: './oils.component.html',
  styleUrls: ['./oils.component.css']
})
export class OilsComponent implements OnInit {

  oils: any;

  constructor(private _bannerService: BannerService, private _oilService: OilService) {
    this._bannerService.toggleBanned(false);
   }

  ngOnInit(): void {
    this._oilService.getAllOils().subscribe((response: any) => {
      this.oils = response.oils;
      
    })
  }

}
