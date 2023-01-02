import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SoapService } from 'src/app/services/soap.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-soaps',
  templateUrl: './user-soaps.component.html',
  styleUrls: ['./user-soaps.component.css']
})
export class UserSoapsComponent implements OnInit {

  public userSoaps: any;
  public data: any[] = [];
  public isCustomerLogged: boolean = false;
  public loadProducts: boolean = false;

  constructor(private _soapService: SoapService, 
    private _cartService: CartService, 
    private _userService: UserService) {
      this._userService.isCustomerLogged.subscribe(status => {
        this.isCustomerLogged = status;
      });
     }

  ngOnInit(): void {
    this.loadProducts = true;
    this._soapService.getAllSoaps().subscribe((response: any) => {
      response.soaps.forEach((element: any) => {
        let soap = {
          id: element.id,
          edition: element.edition,
          brand: element.brand,
          description: element.description,
          unitPrice: element.unitPrice,
          unitQuantity: element.unitQuantity,
          url: element.url
        };
        this.data.push(soap);
      });
      this.userSoaps = this.data.slice(0, 3);
    })
  }

  loadMoreDesc(id: any){
    let desc = this.userSoaps.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

  loadMoreProducts() {
    let newLength = this.userSoaps.length + 3;
    if (newLength > this.data.length) {
        newLength = this.data.length;
        this.loadProducts = false;
    }
    this.userSoaps = this.data.slice(0, newLength);
  }

}
