import { Component, OnInit } from '@angular/core';
import { BalmService } from 'src/app/services/balm.service';

@Component({
  selector: 'app-admin-balms',
  templateUrl: './admin-balms.component.html',
  styleUrls: ['./admin-balms.component.css']
})
export class AdminBalmsComponent implements OnInit {

  constructor(private _balmService: BalmService) { }

  ngOnInit(): void {
    this._balmService.getAllBalms().subscribe((response: any) => {
      console.log(response);
      
    })
  }

}
