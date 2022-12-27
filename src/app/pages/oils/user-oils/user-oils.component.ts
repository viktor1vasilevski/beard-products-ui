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

  constructor(private _oilService: OilService, private _cartService: CartService) { }

  ngOnInit(): void {
    this._oilService.getAllOils().subscribe((response: any) => {
      this.userOils = response.oils;
    })
  }

  loadmore(id: any){
    let desc = this.userOils.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

}
