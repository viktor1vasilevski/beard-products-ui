import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);

  constructor() { }

  
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any) {
    let element = this.cartItemList.find((x : any) => x.id == product.id);
    if(element != undefined) {
      if(element.quantity == product.unitQuantity) {
        return
      }
    }

    let index = this.cartItemList.findIndex((x: any) => x.id == product.id);
    //let element = this.cartItemList.find((x: any) => x.id == product.id);

    if(index != -1 && element != undefined){
      element.quantity += 1;
      product['quantity'] = element.quantity;
      this.cartItemList.splice(index, 1);
    } else {
      product['quantity'] = 1;
    }
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a: any)=>{
      grandTotal = grandTotal + (a.unitPrice * a.quantity);
    })
    return grandTotal;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id === a.id){
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  sendCartList(){
    this.productList.next(this.cartItemList);
  }
}
