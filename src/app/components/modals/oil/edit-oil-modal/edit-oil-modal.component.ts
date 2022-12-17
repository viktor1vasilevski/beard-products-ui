import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditOilModel } from 'src/app/pages/oils/admin-oils/create-edit-oil-model';
import * as _ from 'lodash'

@Component({
  selector: 'app-edit-oil-modal',
  templateUrl: './edit-oil-modal.component.html',
  styleUrls: ['./edit-oil-modal.component.css']
})
export class EditOilModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<CreateEditOilModel>();

  model: any;
  errors: any = {
    brandValidationError: '',
    editionValidationError: '',
    priceValidationError: '',
    quantityValidationError: '',
    imageUrlValidationError: ''
  }

  public changedImageUrl = '';
  public isImageChanged: boolean = false;
  public showImagePanel: boolean = false;

  ngOnInit(): void {
    console.log(this.model);
    
    this.model.url === '' ? this.showImagePanel = false : this.showImagePanel = true;
  }

  closeMe() {
    this.closeMeEvent.emit();
  }

  convertStringToNumber(input: string) {  
    if (!input) 
      return NaN;
    if (input.trim().length == 0) { 
        return NaN;
    }
    if(!isNaN(Number(input))){
      return Number(input);
    } else{
      return NaN;
    }
  }

  confirm(brand: string, scent: string, desc: string, quantity: string, price: string) {  
    
    let errorCounter = 0;
    this.errors.brandValidationError = '';
    this.errors.editionValidationError = '';
    this.errors.priceValidationError = '';
    this.errors.quantityValidationError = '';
    this.errors.imageUrlValidationError = '';
   
    const unitPrice = this.convertStringToNumber(price);
    const unitQuantity = this.convertStringToNumber(quantity);

    if(isNaN(unitPrice) && isNaN(unitQuantity)) {
      this.errors.priceValidationError = 'Please enter valid price';
      this.errors.quantityValidationError = 'Please enter valid quantity';
      return;
    }
    if(isNaN(unitPrice)) {
      this.errors.priceValidationError = 'Please enter valid price';
      return;
    }
    if(isNaN(unitQuantity)) {
      this.errors.quantityValidationError = 'Please enter valid quantity';
      return;
    }

    let validationObject = {
      brand: brand,
      scent: scent,
      //liquidVolume: liquidVolume,
      desc: desc,
      quantity: unitQuantity,
      price: unitPrice
    }

    if(this.handleValidationErrors(errorCounter, validationObject) > 0) 
      return;
 
    let editedOilModel: CreateEditOilModel = {
      id: this.model.id,
      brand: brand,
      scent: scent,
      liquidVolume: null,
      unitPrice: unitPrice,
      unitQuantity: unitQuantity,
      url: '',
      description: desc,
    }

    if(this.changedImageUrl === '' && this.showImagePanel) {
      editedOilModel.url = this.model.url;
    } else {
      editedOilModel.url = this.changedImageUrl;
    }

    this.confirmEvent.emit(editedOilModel);
  }

  handleValidationErrors(counter: any, model: any)  {
    // soap brand validation 
    if(model.brand === '') {
      this.errors.brandValidationError = 'Brand is required';
      counter++;
    }
    if(model.brand.length < 3 && model.brand !== '') {
      this.errors.brandValidationError = 'Brand must have more then 3 letters';
      counter++;
    }

    // soap edition validation
    if(model.edition === '') {
      this.errors.editionValidationError = 'Edition is required';
      counter++;
    }
    if(model.edition.length < 3 && model.edition !== '') {
      this.errors.editionValidationError = 'Edition must have more then 3 letters';
      counter++;
    }
    if(model.edition.length > 50) {
      this.errors.editionValidationError = 'Edition must be less then 50 letters';
      counter++;
    }

    if(!Number.isInteger(model.quantity)) {
      this.errors.quantityValidationError = 'Quantity must be whole number';
      counter++;
    }

    // soap quantity validation
    if(model.quantity === 0 || model.quantity < 0) {
      this.errors.quantityValidationError = 'Quantity must be more then 0';
      counter++;
    }
    if(model.quantity > 500) {
      this.errors.quantityValidationError = 'Quantity must be less then 500';
      counter++;
    }

    // soap price validation
    if(model.price === 0 || model.price < 0) {
      this.errors.priceValidationError = 'Price must be more then 0';
      counter++;
    }
    if(model.price > 1000) {
      this.errors.priceValidationError = 'Price must be less then 1000';
      counter++;
    }

    if(!this.showImagePanel) {
      this.errors.imageUrlValidationError = 'Please choose image';
      counter++;
    }

    return counter;
  }


  fileChangeEvent(fileInput: any) {
    this.showImagePanel = true;
    this.errors.imageUrlValidationError = '';
    if (fileInput.target.files && fileInput.target.files[0]) {

      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.errors.imageUrlValidationError =`Maximum size allowed is ${max_size / 1000}Mb`;
        return;
      } 

      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
        this.errors.imageUrlValidationError = 'Only Images are allowed ( JPG | PNG )';
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
            this.errors.imageUrlValidationError = `Maximum dimentions allowed ${max_height}*${max_width}px`;
            return;
          } else {  
            this.isImageChanged = true;
            this.changedImageUrl = e.target.result.toString();    
          }
        };
      };

      reader.readAsDataURL(fileInput.target.files[0]);
    } else {
      this.removeImage();
    }
  }

  removeImage() {
    this.showImagePanel = false;
    this.isImageChanged = false;
    this.changedImageUrl = '';
    this.errors.imageUrlValidationError = '';
  }

}
