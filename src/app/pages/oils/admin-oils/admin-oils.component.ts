import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CreateOilModalService } from 'src/app/services/modals/oil/create-oil-modal.service';
import { DeleteOilModalService } from 'src/app/services/modals/oil/delete-oil-modal.service';
import { EditOilModalService } from 'src/app/services/modals/oil/edit-oil-modal.service';
import { OilService } from 'src/app/services/oil.service';
import { CreateEditOilModel } from './create-edit-oil-model';

@Component({
  selector: 'app-admin-oils',
  templateUrl: './admin-oils.component.html',
  styleUrls: ['./admin-oils.component.css']
})
export class AdminOilsComponent implements OnInit, OnDestroy {

  public source: LocalDataSource;
  public oils: any;

  @ViewChild('deleteOilModal', { read: ViewContainerRef })
  deleteOilEntry!: ViewContainerRef;
  deleteOilSub!: Subscription;

  @ViewChild('createOilModal', { read: ViewContainerRef })
  createOilEntry!: ViewContainerRef;
  createOilSub!: Subscription;

  @ViewChild('editOilModal', { read: ViewContainerRef })
  editOilEntry!: ViewContainerRef;
  editOilSub!: Subscription;

  public createdOilModel : CreateEditOilModel = {
    brand : '',
    description: '',
    liquidVolume: null,
    scent : '',
    unitPrice: null,
    unitQuantity: null,
    url: ''
  }

  constructor(private _oilService: OilService,
    private _toastr: ToastrService,
    private _createOilModalService: CreateOilModalService,
    private _deleteOilModalService: DeleteOilModalService,
    private _editOilModalService: EditOilModalService) {
      this.source = new LocalDataSource();
  }

  ngOnInit(): void {
    this._oilService.getAllOils().subscribe((response: any) => {
      this.oils = response.oils;
      this.source.load(this.oils);
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
      scent: {
        title: 'Scent',
        filter: true,
        sort: false,
      },
      liquidVolume: {
        title: 'Liquid Volume',
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

  openCreateOilModal() {
    this.createOilSub = this._createOilModalService
      .openModal(this.createOilEntry)
      .subscribe((model) => {
       this._oilService.createEditOil(model).subscribe((response: CreateEditOilModel) => {
        this.oils.unshift(response);
        this.source.load(this.oils);
        this._toastr.success('Oil seccessfuly created!', 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
       }, (err: any) => {
        this._toastr.error('Creating oil was unsuccessful!', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
       });
      });
  } 

  onAction(event: any) {
    switch (event.action) {

      case 'edit':
        this.editOilSub = this._editOilModalService
        .openModal(this.editOilEntry, event.data)
        .subscribe((model) => {
          this._oilService.createEditOil(model).subscribe((response: CreateEditOilModel) => {
            let indexOfEditedItem = this.oils.findIndex((x : any) => x.id == response.id);
            this.oils.splice(indexOfEditedItem, 1);
            this.oils.unshift(response);
            this.source.load(this.oils);
            this._toastr.success('Oil seccessfuly edited!', 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          }, (err:any) => {
            this._toastr.error('Editing oil was unsuccessful!', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
          })      
        });
        break;

      case 'delete':
        this.deleteOilSub = this._deleteOilModalService
          .openModal(this.deleteOilEntry, event.data.brand, event.data.scent, event.data.unitQuantity, event.data.unitPrice, event.data.url)
          .subscribe((status) => {
            if(status) {
              this._oilService.deleteOil(event.data.id).subscribe((response: boolean) => {
                if(response) {
                  let index = this.oils.findIndex((x : any) => x.id == event.data.id);
                  this.oils.splice(index, 1);
                  this.source.load(this.oils);
                  this._toastr.success('Oil seccessfuly deleted!', 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
                } else { 
                  this._toastr.error('Deleting oil was unsuccessful!', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' });
                }
              })
            } else { this._toastr.error('Deleting oil was unsuccessful!', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' }); }       
          }, (err: any) => { this._toastr.error('Deleting oil was unsuccessful!', 'Error', { timeOut: 3000, positionClass: 'toast-bottom-right' }); });
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    if (this.deleteOilSub) this.deleteOilSub.unsubscribe();
    if (this.createOilSub) this.createOilSub.unsubscribe();
    if (this.editOilSub) this.editOilSub.unsubscribe();
  }

}
