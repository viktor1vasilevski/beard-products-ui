import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditBalmModel } from 'src/app/pages/balms/admin-balms/create-edit-balm-model';
import * as _ from 'lodash'

@Component({
  selector: 'app-edit-balm-modal',
  templateUrl: './edit-balm-modal.component.html',
  styleUrls: ['./edit-balm-modal.component.css']
})
export class EditBalmModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<CreateEditBalmModel>();

  model: any;
  errors: any = {
    brandValidationError: '',
    volumeValidationError: '',
    priceValidationError: '',
    quantityValidationError: '',
    imageUrlValidationError: ''
  }

  public changedImageUrl = '';
  public isImageChanged: boolean = false;
  public showImagePanel: boolean = false;

  ngOnInit(): void {
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

  confirm(brand: string, volume: string, quantity: string, price: string, desc: string) {   
    let errorCounter = 0;
    this.resetValidationErrors();

    let validationObject = {
      brand: brand,
      volume: volume,
      desc: desc,
      quantity: quantity,
      price: price
    }

    if(this.handleValidationErrors(errorCounter, validationObject) > 0) 
      return;

    const unitPrice = this.convertStringToNumber(price);
    const unitQuantity = this.convertStringToNumber(quantity);
    const balmVolume = this.convertStringToNumber(volume);
 
    let editedBalmModel: CreateEditBalmModel = {
      id: this.model.id,
      brand: brand,
      volume: balmVolume,
      unitPrice: unitPrice,
      unitQuantity: unitQuantity,
      url: '',
      description: desc,
    }

    if(this.changedImageUrl === '' && this.showImagePanel) {
      editedBalmModel.url = this.model.url;
    } else {
      editedBalmModel.url = this.changedImageUrl;
    }

    this.confirmEvent.emit(editedBalmModel);
  }

  handleValidationErrors(counter: any, model: any)  {

    const unitPrice = this.convertStringToNumber(model.price);
    const unitQuantity = this.convertStringToNumber(model.quantity);
    const volume = this.convertStringToNumber(model.volume);

    if(isNaN(unitPrice) && isNaN(unitQuantity) && isNaN(volume)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.quantityValidationError = 'Quantity is required';
      this.errors.volumeValidationError = 'Volume is required';
      counter++;
    }
    if(isNaN(unitPrice) && isNaN(unitQuantity)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.quantityValidationError = 'Quantity is required';
      counter++;
    }
    if(isNaN(unitPrice) && isNaN(volume)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.volumeValidationError = 'Volume is required';
      counter++;
    }
    if(isNaN(unitQuantity) && isNaN(volume)) {
      this.errors.quantityValidationError = 'Quantity is required';
      this.errors.volumeValidationError = 'Volume is required';
      counter++;
    }
    if(isNaN(unitPrice)) {
      this.errors.priceValidationError = 'Price is required';
      counter++;
    }

    // balm brand validation 
    if(model.brand === '') {
      this.errors.brandValidationError = 'Brand is required';
      counter++;
    }
    if(model.brand.length < 3 && model.brand !== '') {
      this.errors.brandValidationError = 'Brand must have more then 3 letters';
      counter++;
    }

    if(!Number.isInteger(unitQuantity)) {
      this.errors.quantityValidationError = 'Quantity must be whole number';
      counter++;
    }

    if(isNaN(unitQuantity)) {
      this.errors.quantityValidationError = 'Quantity is required';
      counter++;
    }

    // oil quantity validation
    if(unitQuantity === 0 || unitQuantity < 0) {
      this.errors.quantityValidationError = 'Quantity must be more then 0 units';
      counter++;
    }
    if(unitQuantity > 500) {
      this.errors.quantityValidationError = 'Quantity must be less then 500 units';
      counter++;
    }

    // oil liquid volume validaton
    if(model.volume === 0 || model.volume < 10) {
      this.errors.volumeValidationError = 'Volume must be more then 10g';
      counter++;
    }

    if(!Number.isInteger(volume)) {
      this.errors.volumeValidationError = 'Volume must be whole number';
      counter++;
    }

    if(isNaN(volume)) {
      this.errors.volumeValidationError = 'Volume is required';
      counter++;
    }
    
    if(model.volume > 150) {
      this.errors.volumeValidationError = 'Volume must be less then 150g';
      counter++;
    }

    
    if(!Number.isInteger(unitPrice)) {
      this.errors.priceValidationError = 'Price must be whole number';
      counter++;
    }

    // oil price validation
    debugger;
    if(unitPrice === 0 || unitPrice < 0) {
      this.errors.priceValidationError = 'Price must be more then 0 $';
      counter++;
    }

    if(unitPrice > 1000) {
      this.errors.priceValidationError = 'Price must be less then 1000 $';
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
    this.errors.volumeValidationError = '';
    this.errors.editionValidationError = '';
    this.errors.priceValidationError = '';
    this.errors.quantityValidationError = '';
    this.errors.imageUrlValidationError = '';
  }

}
