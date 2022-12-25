import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OilService } from 'src/app/services/oil.service';

@Component({
  selector: 'app-user-oils',
  templateUrl: './user-oils.component.html',
  styleUrls: ['./user-oils.component.css']
})
export class UserOilsComponent implements OnInit {

  public userOils: any;
  public orginalOils: any[] = [];

  constructor(private _oilService: OilService, private _cartService: CartService) { }

  ngOnInit(): void {
    this._oilService.getAllOils().subscribe((response: any) => {
      this.userOils = response.oils;
      this.userOils.forEach((oil: any) => {
        let tempData = { 
          desc: oil.description, 
          id : oil.id 
        };
        this.orginalOils.push(tempData);
        oil.description = oil.description.slice(0, 150);
      });
      
    })
  }

  loadMoreDescription(id: any){
    var originalDesc = this.orginalOils.find((x : any) => x.id == id).desc;
    var displayOil = this.userOils.find((x : any) => x.id == id);
    displayOil.description = originalDesc;
  }

  addToCart(item: any) {
    item.description = this.orginalOils.find((x : any) => x.id == item.id).desc;
    this._cartService.addtoCart(item);
  }

}
