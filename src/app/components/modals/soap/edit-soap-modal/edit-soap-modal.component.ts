import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditSoapModel } from 'src/app/pages/soaps/admin-soaps/create-edit-soap-model';

@Component({
  selector: 'app-edit-soap-modal',
  templateUrl: './edit-soap-modal.component.html',
  styleUrls: ['./edit-soap-modal.component.css']
})
export class EditSoapModalComponent implements OnInit {

  @Output() closeMeEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<any>();

  model: any;
  errors: any = {
    brandValidationError: '',
    editionValidationError: '',
    priceValidationError: '',
    quantityValidationError: '',
    imageUrlValidationError: ''
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

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

  confirm(brand: string, edition: string, desc: string, quantity: string, price: string, imageUrl: string) {  
    
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
      edition: edition,
      desc: desc,
      quantity: unitQuantity,
      price: unitPrice,
      imageUrl: imageUrl
    }

    if(this.handleValidationErrors(errorCounter, validationObject) > 0) return;
 
    let editedSoapModel: CreateEditSoapModel = {
      id: this.model.id,
      brand: brand,
      edition: edition,
      unitPrice: unitPrice,
      unitQuantity: unitQuantity,
      url: imageUrl,
      description: desc,
    }

    this.confirmEvent.emit(editedSoapModel);
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

    // soap image validation
    if(model.imageUrl === '') {
      this.errors.imageUrlValidationError = 'Please enter image url';
      counter++;
    }

    return counter;
  }
}
