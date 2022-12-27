import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AddToCartWarningModalService } from 'src/app/services/modals/add-to-cart/add-to-cart-warning-modal.service';
import { SoapService } from 'src/app/services/soap.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-soaps',
  templateUrl: './user-soaps.component.html',
  styleUrls: ['./user-soaps.component.css']
})
export class UserSoapsComponent implements OnInit {

  public userSoaps: any;
  public orginalSoaps: any[] = [];
  public isCustomerLogged: boolean = false;
  public loadmoreText: boolean = false;

  constructor(private _soapService: SoapService, 
    private _cartService: CartService, 
    private _userService: UserService) {
      this._userService.isCustomerLogged.subscribe(status => {
        this.manageAddtoCartLogic(status);
      });
     }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.userSoaps = response.soaps;
    })
  }

  loadmore(id: any){
    let desc = this.userSoaps.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  loadMoreDescription(id: any){
    var originalDesc = this.orginalSoaps.find((x : any) => x.id == id).desc;
    var displaySoap = this.userSoaps.find((x : any) => x.id == id);
    displaySoap.description = originalDesc;
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

  manageAddtoCartLogic(status: any) {
    this.isCustomerLogged = status;
  }

}
