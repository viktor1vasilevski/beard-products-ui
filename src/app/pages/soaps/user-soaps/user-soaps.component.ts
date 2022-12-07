import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-soaps',
  templateUrl: './user-soaps.component.html',
  styleUrls: ['./user-soaps.component.css']
})
export class UserSoapsComponent implements OnInit {

  @Input() soaps: any;

  constructor() { }

  ngOnInit(): void {
    console.log(this.soaps);
    
  }

}
