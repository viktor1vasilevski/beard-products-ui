import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditSoapModel } from 'src/app/pages/soaps/admin-soaps/create-edit-soap-model';
import * as _ from 'lodash'

@Component({
  selector: 'app-edit-soap-modal',
  templateUrl: './edit-soap-modal.component.html',
  styleUrls: ['./edit-soap-modal.component.css']
})
export class EditSoapModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<CreateEditSoapModel>();

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

  constructor() {}

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

  confirm(brand: string, edition: string, desc: string, quantity: string, price: string) {  
    
    let errorCounter = 0;
    this.resetValidationErrors();

    let validationObject = {
      brand: brand,
      edition: edition,
      desc: desc,
      quantity: quantity,
      price: price
    }

    if(this.handleValidationErrors(errorCounter, validationObject) > 0) 
      return;
  
    const unitPrice = this.convertStringToNumber(price);
    const unitQuantity = this.convertStringToNumber(quantity);

    let editedSoapModel: CreateEditSoapModel = {
      id: this.model.id,
      brand: brand,
      edition: edition,
      unitPrice: unitPrice,
      unitQuantity: unitQuantity,
      url: '',
      description: desc,
    }

    if(this.changedImageUrl === '' && this.showImagePanel) {
      editedSoapModel.url = this.model.url;
    } else {
      editedSoapModel.url = this.changedImageUrl;
    }

    this.confirmEvent.emit(editedSoapModel);
  }

  handleValidationErrors(counter: any, model: any)  {

    const unitPrice = this.convertStringToNumber(model.price);
    const unitQuantity = this.convertStringToNumber(model.quantity);

    if(isNaN(unitPrice) && isNaN(unitQuantity)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.quantityValidationError = 'Please enter valid quantity';
      counter++;
    }
    if(isNaN(unitPrice)) {
      this.errors.priceValidationError = 'Price is required';
      counter++;
    }
    if(isNaN(unitQuantity)) {
      this.errors.quantityValidationError = 'Please enter valid quantity';
      counter++;
    }


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

    if(!Number.isInteger(unitQuantity)) {
      this.errors.quantityValidationError = 'Quantity must be whole number';
      counter++;
    }

    // soap quantity validation
    if(unitQuantity === 0 || unitQuantity < 0) {
      this.errors.quantityValidationError = 'Quantity must be more then 0';
      counter++;
    }
    if(model.quantity > 500) {
      this.errors.quantityValidationError = 'Quantity must be less then 500';
      counter++;
    }

    if(isNaN(unitQuantity)) {
      this.errors.quantityValidationError = 'Quantity is required';
      counter++;
    }

    // soap price validation
    if(unitPrice === 0 || unitPrice < 0) {
      this.errors.priceValidationError = 'Price must be more then 0';
      counter++;
    }
    if(model.price > 1000) {
      this.errors.priceValidationError = 'Price must be less then 1000';
      counter++;
    }

    if(!this.showImagePanel) {
      this.errors.imageUrlValidationError = 'Image is required';
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
      //this.removeImage();
    }
  }

  removeImage() {
    this.showImagePanel = false;
    this.isImageChanged = false;
    this.changedImageUrl = '';
    this.errors.imageUrlValidationError = '';
  }

  resetValidationErrors() {
    this.errors.brandValidationError = '';
    this.errors.editionValidationError = '';
    this.errors.priceValidationError = '';
    this.errors.quantityValidationError = '';
    this.errors.imageUrlValidationError = '';
  }
  
}
