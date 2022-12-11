import { Component, Input, OnInit } from '@angular/core';
import { SoapService } from 'src/app/services/soap.service';

@Component({
  selector: 'app-user-soaps',
  templateUrl: './user-soaps.component.html',
  styleUrls: ['./user-soaps.component.css']
})
export class UserSoapsComponent implements OnInit {

  public soaps: any;

  constructor(private _soapService: SoapService) { }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.soaps = response.soaps;
    })
  }


  

}
