import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-oil-modal',
  templateUrl: './delete-oil-modal.component.html',
  styleUrls: ['./delete-oil-modal.component.css']
})
export class DeleteOilModalComponent {

  @Input() title: string = '';
  @Input() subTitle: any = null;
  @Input() quantity: any =  null;
  @Input() price: string = '';
  @Input() imageUrl: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<boolean>(false);

  closeMe() {
    this.closeMeEvent.emit();
  }
  
  confirm() {  
    this.confirmEvent.emit(true);
  }

}
