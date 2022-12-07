import { Component, OnInit } from '@angular/core';
import { BalmService } from 'src/app/services/balm.service';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-balms',
  templateUrl: './balms.component.html',
  styleUrls: ['./balms.component.css']
})
export class BalmsComponent implements OnInit {

  balms: any;

  constructor(private _bannerService: BannerService, private _balmService: BalmService) {
    this._bannerService.toggleBanned(false);
   }

  ngOnInit(): void {
    this._balmService.getAllBalms().subscribe((response: any)=>{
      this.balms = response.balms;
    })
  }

}
