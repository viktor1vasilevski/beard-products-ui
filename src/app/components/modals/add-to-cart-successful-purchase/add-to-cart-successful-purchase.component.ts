import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-successful-purchase',
  templateUrl: './add-to-cart-successful-purchase.component.html',
  styleUrls: ['./add-to-cart-successful-purchase.component.css']
})
export class AddToCartSuccessfulPurchaseComponent implements OnInit {

  @Output() confirmEvent = new EventEmitter<boolean>(false);

  public mytime = 5;

  confirm() {  
    this.confirmEvent.emit(true);
  }

  ngOnInit(): void {
    let time = 5
    let x = setInterval(() => {
      
      time = time - 1;  
      this.mytime = time;
      if (time === 0) {
        alert("hello");
        clearInterval(x);
      }
    }, 1000);
    
  }

}



