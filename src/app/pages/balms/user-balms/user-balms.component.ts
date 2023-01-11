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
  public data: any[] = [];
  public loadProducts: boolean = false;

  constructor(private _balmSerice: BalmService, 
    private _cartService: CartService) { }

  ngOnInit(): void {

    this._balmSerice.getAllBalms().subscribe((response: any) => {
      response.balms.forEach((element:any) => {
        let balm = {
          id: element.id,
          volume: element.volume,
          brand: element.brand,
          description: element.description,
          unitPrice: element.unitPrice,
          unitQuantity: element.unitQuantity,
          url: element.url
        }
        this.data.push(balm);
      });

      this.userBalms = this.data.slice(0, 3);
    })
    this.loadProducts = true;
  }

  loadMoreDesc(id: any){
    let desc = this.userBalms.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

  loadMoreProducts(){
    let newLength = this.userBalms.length + 3;
    if (newLength >= this.data.length) {
        newLength = this.data.length;
        this.loadProducts = false;
    }
     this.userBalms = this.data.slice(0, newLength);
  }

}
