import { Component, OnInit } from '@angular/core';
import { BalmService } from 'src/app/services/balm.service';

@Component({
  selector: 'app-user-balms',
  templateUrl: './user-balms.component.html',
  styleUrls: ['./user-balms.component.css']
})
export class UserBalmsComponent implements OnInit {

  public userBalms: any;
  public orginalBalms: any[] = [];

  constructor(private _balmSerice: BalmService) { }

  ngOnInit(): void {
    this._balmSerice.getAllBalms().subscribe((response: any) => {
      this.userBalms = response.balms;
      this.userBalms.forEach((balm: any) => {
        let tempData = { 
          desc: balm.description, 
          id : balm.id 
        };
        this.orginalBalms.push(tempData);
        balm.description = balm.description.slice(0, 140);
      });
    })
  }

  loadMoreDescription(id: any){
    var originalDesc = this.orginalBalms.find((x : any) => x.id == id).desc;
    var displayBalm = this.userBalms.find((x : any) => x.id == id);
    displayBalm.description = originalDesc;
  }

}
