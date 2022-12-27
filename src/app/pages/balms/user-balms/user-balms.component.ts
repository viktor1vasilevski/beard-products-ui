import { Component, OnInit } from '@angular/core';
import { BalmService } from 'src/app/services/balm.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-user-balms',
  templateUrl: './user-balms.component.html',
  styleUrls: ['./user-balms.component.css']
})
export class UserBalmsComponent implements OnInit {

  public userBalms: any;
  public orginalBalms: any[] = [];

  constructor(private _balmSerice: BalmService, 
    private _cartService: CartService) { }

  ngOnInit(): void {
    this._balmSerice.getAllBalms().subscribe((response: any) => {
      this.userBalms = response.balms;
    })
  }

  loadmore(id: any){
    let desc = this.userBalms.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

}
