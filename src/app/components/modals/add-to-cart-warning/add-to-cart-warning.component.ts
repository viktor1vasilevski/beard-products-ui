import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-warning',
  templateUrl: './add-to-cart-warning.component.html',
  styleUrls: ['./add-to-cart-warning.component.css']
})
export class AddToCartWarningComponent {

  @Output() closeMeEvent = new EventEmitter();

  closeMe() {
    this.closeMeEvent.emit();
  }

}
