import { Component, EventEmitter, Output } from '@angular/core';
import { CreateEditBalmModel } from 'src/app/pages/balms/admin-balms/create-edit-balm-model';
import * as _ from 'lodash'

@Component({
  selector: 'app-create-balm-modal',
  templateUrl: './create-balm-modal.component.html',
  styleUrls: ['./create-balm-modal.component.css']
})
export class CreateBalmModalComponent {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  public imageError: string | null = '';
  public isImageSaved: boolean = false;
  public cardImageBase64: string | null = '';
  public isImageChosen: boolean = false;

  public priceIsDecimalNumberError: string = '';
  public quantityIsDecimalNumberError: string = '';
  public volumeIsDecimalNumberError: string = '';



  public createdBalmModel: CreateEditBalmModel = {
    brand : '',
    description: '',
    volume: null,
    unitPrice: null,
    unitQuantity: null,
    url: ''
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  confirm() { 
    this.confirmEvent.emit(this.createdBalmModel);
  }

  volumeInput(event: any) {
    if(event.target.value.includes('.')){
      this.volumeIsDecimalNumberError = 'Volume must be whole number';
    } else {
      this.volumeIsDecimalNumberError = '';
    }
  }

  priceInput(event: any) {
    if(event.target.value.includes('.')){
      this.priceIsDecimalNumberError = 'Price must be whole number';
    } else {
      this.priceIsDecimalNumberError = '';
    }
  }

  quantityInput(event: any){
    if(event.target.value.includes('.')){
      this.quantityIsDecimalNumberError = 'Quantity must be whole number';
    } else {
      this.quantityIsDecimalNumberError = '';
    }
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
        this.isImageChosen = false;
        this.setInputTypeFileValueToEmptyString();
        return;
      } 

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        this.isImageChosen = false;
        this.setInputTypeFileValueToEmptyString();
        return;
      } 
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs : any) => {
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError = `Maximum dimentions allowed ${max_height}*${max_width}px`;
            this.isImageChosen = false;
            this.setInputTypeFileValueToEmptyString();
            return;
          } else {
            this.cardImageBase64 = e.target.result.toString();    
            this.createdBalmModel.url = e.target.result.toString();    
            this.isImageChosen = true;
          }
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  removeImage() {
    this.cardImageBase64 = null;
    this.isImageChosen = false;
    this.createdBalmModel.url = '';
    this.imageError = 'Image is required';
    this.setInputTypeFileValueToEmptyString();
  }

  setInputTypeFileValueToEmptyString() {
    document.querySelectorAll('input').forEach((element: any) => {
      if(element.type == 'file') {  
        element.value = '';
      }
    });
  }

}
