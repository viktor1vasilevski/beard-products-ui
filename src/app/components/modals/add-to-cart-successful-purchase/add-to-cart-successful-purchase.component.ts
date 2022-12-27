import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-successful-purchase',
  templateUrl: './add-to-cart-successful-purchase.component.html',
  styleUrls: ['./add-to-cart-successful-purchase.component.css']
})
export class AddToCartSuccessfulPurchaseComponent implements OnInit {

  @Output() confirmEvent = new EventEmitter<boolean>(false);

  public sec = 5;

  confirm() {  
    this.confirmEvent.emit(true);
  }

  ngOnInit(): void {
    let x = setInterval(() => {
      this.sec = this.sec - 1;  
      if (this.sec === 0) {
        clearInterval(x);
        this.confirm();
      }
    }, 1000);
  }

}



