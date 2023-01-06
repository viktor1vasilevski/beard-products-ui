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
  public data: any[] = [];
  public loadProducts: boolean = false;

  constructor(private _oilService: OilService, private _cartService: CartService) { }

  ngOnInit(): void {
    this.loadProducts = true;
    this._oilService.getAllOils().subscribe((response: any) => {
      response.oils.forEach((element: any) => {
        debugger
        let oil = {
          id: element.id,
          liquidVolume: element.liquidVolume,
          scent: element.scent,
          brand: element.brand,
          description: element.description,
          unitPrice: element.unitPrice,
          unitQuantity: element.unitQuantity,
          url: element.url
        }
        this.data.push(oil);
      });
      this.userOils = this.data.slice(0, 3);
    })
  }

  loadMoreDesc(id: any){
    let desc = this.userOils.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

  loadMoreProducts() {
    let newLength = this.userOils.length + 3;
    if (newLength > this.data.length) {
        newLength = this.data.length;
        this.loadProducts = false;
    }
    this.userOils = this.data.slice(0, newLength);
  }

}
