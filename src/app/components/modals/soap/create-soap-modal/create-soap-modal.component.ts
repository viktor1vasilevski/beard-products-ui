import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditSoapModel } from 'src/app/pages/soaps/admin-soaps/create-edit-soap-model';
import * as _ from 'lodash'
import { ImgForceApiService } from 'src/app/services/img-force-api.service';

@Component({
  selector: 'app-create-soap-modal',
  templateUrl: './create-soap-modal.component.html',
  styleUrls: ['./create-soap-modal.component.css']
})
export class CreateSoapModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  public createdSoapModel: CreateEditSoapModel = {
    brand: '',
    edition: '',
    unitPrice: null,
    unitQuantity: null,
    url: '',
    description: ''
  }

  imageError: string | null = '';
  isImageSaved: boolean = false;
  cardImageBase64: string | null = '';
  isImageChosen: boolean = false;

  bar = 'World';

  constructor(private _imgForceApiService: ImgForceApiService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() { 
    console.log(this.createdSoapModel);
    debugger;
    
    this.confirmEvent.emit(this.createdSoapModel);
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =`Maximum size allowed is ${max_size / 1000}Mb`;
        return;
      } 

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        return;
      } 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs : any) => {
          debugger
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError = `Maximum dimentions allowed ${max_height}*${max_width}px`;
            return;
          } else {
            this.cardImageBase64 = e.target.result.toString();    
            this.createdSoapModel.url = e.target.result.toString();    
            this.isImageChosen = true;
              //this.isImageChosen = true;
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageChosen = false;
    this.createdSoapModel.url = '';
  }
  
}
