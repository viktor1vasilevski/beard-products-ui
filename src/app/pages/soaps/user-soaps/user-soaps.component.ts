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

  @ViewChild('addToCartWarningModal', { read: ViewContainerRef })
  addToCartWarningEntry!: ViewContainerRef;
  addToCartWarningSoapSub!: Subscription;

  constructor(private _soapService: SoapService, 
    private _cartService: CartService, 
    private _userService: UserService,  
    private _addToCartWarningModal: AddToCartWarningModalService) {
      this._userService.isCustomerLogged.subscribe(status => {
        this.manageAddtoCartLogic(status);
      });
     }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.userSoaps = response.soaps;
      // this.userSoaps.forEach((soap: any) => {
      //   let tempData = { 
      //     desc: soap.description, 
      //     id : soap.id 
      //   };
      //   this.orginalSoaps.push(tempData);
      //   soap.description = soap.description.slice(0, 140);
      // });
    })
  }

  loadMoreDescription(id: any){
    var originalDesc = this.orginalSoaps.find((x : any) => x.id == id).desc;
    var displaySoap = this.userSoaps.find((x : any) => x.id == id);
    displaySoap.description = originalDesc;
  }

  addToCart(item: any) {
    debugger
    if(!this.isCustomerLogged) {
      this.addToCartWarningSoapSub = this._addToCartWarningModal
      .openModal(this.addToCartWarningEntry)
      .subscribe((m) => {
        this._soapService.createEditSoap(m).subscribe((response: any) =>{

        })
      });
    } else {
      //item.description = this.orginalSoaps.find((x : any) => x.id == item.id).desc;
      this._cartService.addtoCart(item);
    }
    
  }

  manageAddtoCartLogic(status: any) {
    this.isCustomerLogged = status;
  }

}
