import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-successful-purchase',
  templateUrl: './add-to-cart-successful-purchase.component.html',
  styleUrls: ['./add-to-cart-successful-purchase.component.css']
})
export class AddToCartSuccessfulPurchaseComponent implements OnInit {

  @Output() confirmEvent = new EventEmitter<boolean>(false);

  confirm() {  
    this.confirmEvent.emit(true);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.confirm();
    }, 2000)
    
  }

}
