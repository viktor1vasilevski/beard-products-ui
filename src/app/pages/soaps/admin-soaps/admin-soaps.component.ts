import { Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SoapService } from 'src/app/services/soap.service';
import { Subscription } from 'rxjs';
import { DeleteSoapModalService } from 'src/app/services/modals/soap/delete-soap-modal.service';
import { CreateSoapModalService } from 'src/app/services/modals/soap/create-soap-modal.service';
import { EditSoapModalService } from 'src/app/services/modals/soap/edit-soap-modal.service';
import { CreateEditSoapModel } from './create-edit-soap-model';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'app-admin-soaps',
  templateUrl: './admin-soaps.component.html',
  styleUrls: ['./admin-soaps.component.css']
})

export class AdminSoapsComponent implements OnInit, OnDestroy {

  public soaps: any;
  public source: LocalDataSource;

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
    private _editSoapModalService: EditSoapModalService,) {
      this.source = new LocalDataSource();
     }

  ngOnInit(): void {
    this._soapService.getAllSoaps().subscribe((response: any) => {
      this.soaps = response.soaps;
      this.source.load(this.soaps);
    })
  }

  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
      custom: [
        { name: 'edit', title: '<a class="btn btn-info m-1">Edit</a>' },
        { name: 'delete', title: '<a class="btn btn-danger m-1">Delete</a>' }
      ],
      position: 'right'
    },
    columns: {
      brand: {
        title: 'Brand',
        filter: true,
        sort: false,
      },
      edition: {
        title: 'Edition',
        filter: true,
        sort: false,
      },
      description: {
        title: 'Description',
        filter: true,
        sort: false,
      },
      unitQuantity: {
        title: 'Quantity',
        filter: true,
        sort: true,
      },
      unitPrice: {
        title: 'Price',
        filter: true,
      },
      url: {
        title: 'Image',
        filter: false,
        sort: false,
        type: 'html',
        valuePrepareFunction: (url: any) => { return `<img src="${url}" width="100px" hight="100px"  />` }
      }
    },
  };




  onAction(event: any) {
    switch (event.action) {

      case 'edit':
        this.editSoapSub = this._editSoapModalService
        .openModal(this.editSoapEntry, event.data)
        .subscribe((model) => {
          this._soapService.createEditSoap(model).subscribe((response: CreateEditSoapModel) => {
            let indexOfEditedItem = this.soaps.findIndex((x : any) => x.id == response.id);
            this.soaps.splice(indexOfEditedItem, 1);
            this.soaps.unshift(response);
            this.source.load(this.soaps);
            this._toastr.success('Soap seccessfuly edited!');
          }, (err:any) => {
            this._toastr.error('Soap unseccessfuly edited!');
          })      
        });
        break;

      case 'delete':
        this.deleteSoapSub = this._deleteSoapModalService
          .openModal(this.deleteSoapEntry, event.data.brand, event.data.edition, event.data.unitQuantity, event.data.unitPrice, event.data.url)
          .subscribe((status) => {
            if(status) {
              this._soapService.deleteSoap(event.data.id).subscribe((response: boolean) => {
                if(response) {
                  let index = this.soaps.findIndex((x : any) => x.id == event.data.id);
                  this.soaps.splice(index, 1);
                  this.source.load(this.soaps);
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
        break;

      default:
        break;
    }
  }

  openCreateSoapModal() {
    this.createSoapSub = this._createSoapModalService
      .openModal(this.createSoapEntry)
      .subscribe((model) => {
        this._soapService.createEditSoap(model).subscribe((response: CreateEditSoapModel) => {
          this.soaps.unshift(response);
          this.source.load(this.soaps);
          this._toastr.success('Soap seccessfuly created!');
        }, (err:any) => {
          this._toastr.error('Soap unseccessfuly created!');
        })
      });
  } 
    
  ngOnDestroy(): void {
    if (this.deleteSoapSub) this.deleteSoapSub.unsubscribe();
    if (this.createSoapSub) this.createSoapSub.unsubscribe();
    if (this.editSoapSub) this.editSoapSub.unsubscribe();
  }
}
