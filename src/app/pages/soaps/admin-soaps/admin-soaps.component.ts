import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SoapService } from 'src/app/services/soap.service';
import { Subscription } from 'rxjs';
import { DeleteSoapModalService } from 'src/app/services/modals/soap/delete-soap-modal.service';
import { CreateSoapModalService } from 'src/app/services/modals/soap/create-soap-modal.service';
import { EditSoapModalService } from 'src/app/services/modals/soap/edit-soap-modal.service';
import { CreateEditSoapModel } from './create-edit-soap-model';
import { ImgForceApiService } from 'src/app/services/img-force-api.service';


@Component({
  selector: 'app-admin-soaps',
  templateUrl: './admin-soaps.component.html',
  styleUrls: ['./admin-soaps.component.css']
})

export class AdminSoapsComponent implements OnInit, OnDestroy {

  @Input() soaps: any;
  public imagePath = '';

  @ViewChild('deleteSoapModal', { read: ViewContainerRef })
  deleteSoapEntry!: ViewContainerRef;
  deleteSoapSub!: Subscription;

  @ViewChild('createSoapModal', { read: ViewContainerRef })
  createSoapEntry!: ViewContainerRef;
  createSoapSub!: Subscription;

  @ViewChild('editSoapModal', { read: ViewContainerRef })
  editSoapEntry!: ViewContainerRef;
  editSoapSub!: Subscription;

  public createdSoapModel: CreateEditSoapModel = {
    brand: '',
    edition: '',
    unitPrice: null,
    unitQuantity: null,
    url: '',
    description: ''
  }

  constructor(private _soapService: SoapService, 
    private _toastr: ToastrService, 
    private _deleteSoapModalService: DeleteSoapModalService, 
    private _createSoapModalService: CreateSoapModalService, 
    private _editSoapModalService: EditSoapModalService, 
    private _imgForceApi: ImgForceApiService) { }

  ngOnInit(): void {

  }


  openCreateSoapModal() {
    this.createSoapSub = this._createSoapModalService
      .openModal(this.createSoapEntry)
      .subscribe((model) => {
        this._imgForceApi.myApi(model).subscribe((res: any) => {
          if(res.success === 200) {
            debugger;
            this._soapService.createEditSoap(model, res.image.url).subscribe((response: CreateEditSoapModel) => {
              this.soaps.unshift(response);
              this._toastr.success('Soap seccessfuly created!');
            }, (err:any) => {
              this._toastr.error('Soap unseccessfuly created!');
            })  
          }    
        }, (err: any) => {
          this._toastr.error('Soap unseccessfuly created!');
        })  
      });
  } 

  openDeleteSoapModal(soap: CreateEditSoapModel) {
    this.deleteSoapSub = this._deleteSoapModalService
      .openModal(this.deleteSoapEntry, soap.brand, soap.edition, soap.unitQuantity, soap.unitPrice, soap.url)
      .subscribe((status) => {
        if(status) {
          this._soapService.deleteSoap(soap.id).subscribe((response: boolean) => {
            if(response) {
              let index = this.soaps.findIndex((x : any) => x.id == soap.id);
              this.soaps.splice(index, 1);
              this._toastr.success('Soap sucessfuly deleted!')
            } else {
              this._toastr.error('Soap unsecessfuly deleted!');
            }
          })
        } else { 
          this._toastr.error('Soap unseccessfuly deleted!');
        }       
      }, (err: any) => {
        this._toastr.error('Soap unseccessfuly deleted!');
      });
  }

  openEditSoapModal(soap: CreateEditSoapModel) {
    // treba istoto da se nap[ravi za edit]
    this.editSoapSub = this._editSoapModalService
    .openModal(this.editSoapEntry, soap)
    .subscribe((model) => {
      this._soapService.createEditSoap(model, this.imagePath).subscribe((response: CreateEditSoapModel) => {
        let index = this.soaps.findIndex((x : any) => x.id == response.id);
        this.soaps.splice(index, 1);
        this.soaps.unshift(response);

        this._toastr.success('Soap seccessfuly edited!');
      }, (err:any) => {

        this._toastr.error('Soap unseccessfuly edited!');
      })      
    });
  }


    
  ngOnDestroy(): void {
    if (this.deleteSoapSub) this.deleteSoapSub.unsubscribe();
    if (this.createSoapSub) this.createSoapSub.unsubscribe();
    if (this.editSoapSub) this.editSoapSub.unsubscribe();
  }
}
