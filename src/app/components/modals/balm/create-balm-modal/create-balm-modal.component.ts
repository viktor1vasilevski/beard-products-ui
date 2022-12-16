import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-balm-modal',
  templateUrl: './create-balm-modal.component.html',
  styleUrls: ['./create-balm-modal.component.css']
})
export class CreateBalmModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
