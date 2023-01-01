import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
  public isCustomerLogged: boolean = false;
  public loadmoreText: boolean = false;

  constructor(private _soapService: SoapService, 
    private _cartService: CartService, 
    private _userService: UserService, 
    private _toastr: ToastrService) {
      this._userService.isCustomerLogged.subscribe(status => {
        this.isCustomerLogged = status;
      });
     }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.userSoaps = response.soaps;
      console.log(this.userSoaps);
      
    })
  }

  loadmore(id: any){
    let desc = this.userSoaps.find((x : any) => x.id == id).description;
    let el = document.getElementById(id);
    if(el != undefined) {
      el.innerText = desc;
    }
  }

  addToCart(item: any) {
    this._cartService.addtoCart(item);
  }

}
