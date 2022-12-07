import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-soap-modal',
  templateUrl: './delete-soap-modal.component.html',
  styleUrls: ['./delete-soap-modal.component.css']
})
export class DeleteSoapModalComponent implements OnInit {

  constructor() {}

  @Input() title: string = '';
  @Input() subTitle: any = null;
  @Input() quantity: any =  null;
  @Input() price: string = '';
  @Input() imageUrl: string = '';
  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<boolean>(false);

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  closeMe() {
    this.closeMeEvent.emit();
  }
  confirm() {  
    this.confirmEvent.emit(true);
  }

}
