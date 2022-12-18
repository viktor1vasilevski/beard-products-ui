import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BalmService } from 'src/app/services/balm.service';
import { CreateBalmModalService } from 'src/app/services/modals/balm/create-balm-modal.service';
import { DeleteBalmModalService } from 'src/app/services/modals/balm/delete-balm-modal.service';
import { EditBalmModalService } from 'src/app/services/modals/balm/edit-balm-modal.service';
import { CreateEditBalmModel } from './create-edit-balm-model';

@Component({
  selector: 'app-admin-balms',
  templateUrl: './admin-balms.component.html',
  styleUrls: ['./admin-balms.component.css']
})
export class AdminBalmsComponent implements OnInit {

  public balms: any;
  public source: LocalDataSource;

  @ViewChild('deleteBalmModal', { read: ViewContainerRef })
  deleteBalmEntry!: ViewContainerRef;
  deleteBalmSub!: Subscription;

  @ViewChild('createBalmModal', { read: ViewContainerRef })
  createBalmEntry!: ViewContainerRef;
  createBalmSub!: Subscription;

  @ViewChild('editBalmModal', { read: ViewContainerRef })
  editBalmEntry!: ViewContainerRef;
  editBalmSub!: Subscription;

  constructor(private _balmService: BalmService,
    private _toastr: ToastrService,
    private _deleteBalmModalService: DeleteBalmModalService, 
    private _createBalmModalService: CreateBalmModalService, 
    private _editBalmModalService: EditBalmModalService,) {
    this.source = new LocalDataSource();
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
      volume: {
        title: 'Volume',
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

  ngOnInit(): void {
    this._balmService.getAllBalms().subscribe((response: any) => {
      this.balms = response.balms;
      this.source.load(this.balms);
    })
  }

  onAction(event: any) {
    switch (event.action) {

      case 'edit':
        this.editBalmSub = this._editBalmModalService
        .openModal(this.editBalmEntry, event.data)
        .subscribe((model) => {
          this._balmService.createEditBalm(model).subscribe((response: CreateEditBalmModel) => {
            let indexOfEditedItem = this.balms.findIndex((x : any) => x.id == response.id);
            this.balms.splice(indexOfEditedItem, 1);
            this.balms.unshift(response);
            this.source.load(this.balms);
            this._toastr.success('Balm seccessfuly edited!');
          }, (err:any) => {
            this._toastr.error('Balm unseccessfuly edited!');
          })      
        });
        break;

      case 'delete':
        this.deleteBalmSub = this._deleteBalmModalService
          .openModal(this.deleteBalmEntry, event.data.brand, event.data.volume, event.data.unitQuantity, event.data.unitPrice, event.data.url)
          .subscribe((status) => {
            if(status) {
              this._balmService.deleteBalm(event.data.id).subscribe((response: boolean) => {
                if(response) {
                  let index = this.balms.findIndex((x : any) => x.id == event.data.id);
                  this.balms.splice(index, 1);
                  this.source.load(this.balms);
                  this._toastr.success('Balm sucessfuly deleted!')
                } else {
                  this._toastr.error('Balm unsecessfuly deleted!');
                }
              })
            } else { 
              this._toastr.error('Balm unseccessfuly deleted!');
            }       
          }, (err: any) => {
            this._toastr.error('Balm unseccessfuly deleted!');
          });
        break;

      default:
        break;
    }
  }

  openCreateBalmModal() {
    this.createBalmSub = this._createBalmModalService
      .openModal(this.createBalmEntry)
      .subscribe((model) => {
        this._balmService.createEditBalm(model).subscribe((response: CreateEditBalmModel) => {
          this.balms.unshift(response);
          this.source.load(this.balms);
          this._toastr.success('Balm seccessfuly created!');
        }, (err:any) => {
          this._toastr.error('Balm unseccessfuly created!');
        })
      });
  } 
    
  ngOnDestroy(): void {
    if (this.deleteBalmSub) this.deleteBalmSub.unsubscribe();
    if (this.createBalmSub) this.createBalmSub.unsubscribe();
    if (this.editBalmSub) this.editBalmSub.unsubscribe();
  }

}
