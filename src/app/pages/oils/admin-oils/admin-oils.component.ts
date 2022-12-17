import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
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
export class AdminOilsComponent implements OnInit {

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
        
      })
    // this.createSoapSub = this._createSoapModalService
    //   .openModal(this.createSoapEntry)
    //   .subscribe((model) => {
    //     this._soapService.createEditSoap(model).subscribe((response: CreateEditSoapModel) => {
    //       this.soaps.unshift(response);
    //       this.source.load(this.soaps);
    //       this._toastr.success('Soap seccessfuly created!');
    //     }, (err:any) => {
    //       this._toastr.error('Soap unseccessfuly created!');
    //     })
    //   });
  } 

  onAction(event: any) {

  }

}
