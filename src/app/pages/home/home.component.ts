import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/services/banner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _bannerService: BannerService) {
    //this._bannerService.toggleBanned(false);
   }

  ngOnInit(): void {
  }

}
