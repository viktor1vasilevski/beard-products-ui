import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-oil-modal',
  templateUrl: './create-oil-modal.component.html',
  styleUrls: ['./create-oil-modal.component.css']
})
export class CreateOilModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

}
