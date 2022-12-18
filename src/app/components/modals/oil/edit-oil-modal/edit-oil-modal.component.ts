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
    scentValidationError: '',
    liquidVolumeValidationError: '',
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

  confirm(brand: string, scent: string, liquid: string, quantity: string, price: string, desc: string) {  
    
    let errorCounter = 0;
    this.resetValidationErrors();

    let validationObject = {
      brand: brand,
      scent: scent,
      liquidVolume: liquid,
      desc: desc,
      quantity: quantity,
      price: price
    }

    if(this.handleValidationErrors(errorCounter, validationObject) > 0) 
      return;

    const unitPrice = this.convertStringToNumber(price);
    const unitQuantity = this.convertStringToNumber(quantity);
    const liquidVolume = this.convertStringToNumber(liquid);
 
    let editedOilModel: CreateEditOilModel = {
      id: this.model.id,
      brand: brand,
      scent: scent,
      liquidVolume: liquidVolume,
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
    debugger;
    const unitPrice = this.convertStringToNumber(model.price);
    const unitQuantity = this.convertStringToNumber(model.quantity);
    const liquidVolume = this.convertStringToNumber(model.liquidVolume);

    if(isNaN(unitPrice) && isNaN(unitQuantity) && isNaN(liquidVolume)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.quantityValidationError = 'Quantity is required';
      this.errors.liquidVolumeValidationError = 'Liquid volume is required';
      counter++;
    }
    if(isNaN(unitPrice) && isNaN(unitQuantity)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.quantityValidationError = 'Quantity is required';
      counter++;
    }
    if(isNaN(unitPrice) && isNaN(liquidVolume)) {
      this.errors.priceValidationError = 'Price is required';
      this.errors.liquidVolumeValidationError = 'Liquid volume is required';
      counter++;
    }
    if(isNaN(unitQuantity) && isNaN(liquidVolume)) {
      this.errors.quantityValidationError = 'Quantity is required';
      this.errors.liquidVolumeValidationError = 'Liquid volume is required';
      counter++;
    }
    if(isNaN(unitPrice)) {
      this.errors.priceValidationError = 'Price is required';
      counter++;
    }

    // oil brand validation 
    if(model.brand === '') {
      this.errors.brandValidationError = 'Brand is required';
      counter++;
    }
    if(model.brand.length < 3 && model.brand !== '') {
      this.errors.brandValidationError = 'Brand must have more then 3 letters';
      counter++;
    }

    // oil edition validation
    if(model.scent === '') {
      this.errors.scentValidationError = 'Scent is required';
      counter++;
    }
    if(model.scent.length < 3 && model.scent !== '') {
      this.errors.scentValidationError = 'Scent must have more then 3 letters';
      counter++;
    }
    if(model.scent.length > 50) {
      this.errors.scentValidationError = 'Scent must be less then 50 letters';
      counter++;
    }

    if(!Number.isInteger(unitQuantity)) {
      debugger;
      this.errors.quantityValidationError = 'Quantity must be whole number';
      counter++;
    }

    if(isNaN(unitQuantity)) {
      this.errors.quantityValidationError = 'Quantity is required';
      counter++;
    }

    // oil quantity validation
    if(model.quantity === 0 || model.quantity < 0) {
      this.errors.quantityValidationError = 'Quantity must be more then 0';
      counter++;
    }
    if(model.quantity > 500) {
      this.errors.quantityValidationError = 'Quantity must be less then 500';
      counter++;
    }

    // oil liquid volume validaton
    if(model.liquidVolume === 0 || model.liquidVolume < 30) {
      this.errors.liquidVolumeValidationError = 'Liquie volume must be more then 30ml';
      counter++;
    }

    if(isNaN(liquidVolume)) {
      this.errors.liquidVolumeValidationError = 'Liquid volume is required';
      counter++;
    }
    
    if(model.liquidVolume > 100) {
      this.errors.liquidVolumeValidationError = 'Liquie volume must be less then 100ml';
      counter++;
    }

    // oil price validation
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

  resetValidationErrors() {
    this.errors.brandValidationError = '';
    this.errors.scentValidationError = '',
    this.errors.liquidVolumeValidationError = '';
    this.errors.editionValidationError = '';
    this.errors.priceValidationError = '';
    this.errors.quantityValidationError = '';
    this.errors.imageUrlValidationError = '';
  }

}
