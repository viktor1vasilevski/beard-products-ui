import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SoapService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-user-soaps',
  templateUrl: './user-soaps.component.html',
  styleUrls: ['./user-soaps.component.css']
})
export class UserSoapsComponent implements OnInit {

  public userSoaps: any;
  public orginalSoaps: any[] = [];

  constructor(private _soapService: SoapService, private _cartService: CartService) { }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.userSoaps = response.soaps;
      this.userSoaps.forEach((soap: any) => {
        let tempData = { 
          desc: soap.description, 
          id : soap.id 
        };
        this.orginalSoaps.push(tempData);
        soap.description = soap.description.slice(0, 140);
      });
    })
  }

  loadMoreDescription(id: any){
    var originalDesc = this.orginalSoaps.find((x : any) => x.id == id).desc;
    var displaySoap = this.userSoaps.find((x : any) => x.id == id);
    displaySoap.description = originalDesc;
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

}
