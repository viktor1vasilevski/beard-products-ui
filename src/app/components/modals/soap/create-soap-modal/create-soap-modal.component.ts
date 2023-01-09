import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditSoapModel } from 'src/app/pages/soaps/admin-soaps/create-edit-soap-model';
import * as _ from 'lodash'

@Component({
  selector: 'app-create-soap-modal',
  templateUrl: './create-soap-modal.component.html',
  styleUrls: ['./create-soap-modal.component.css']
})
export class CreateSoapModalComponent {

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

  public imageError: string | null = '';
  public isImageSaved: boolean = false;
  public cardImageBase64: string | null = '';
  public isImageChosen: boolean = false;
  public priceError: string = ''
  public quantityError: string = ''

  public priceIsDecimalNumberError: string = '';
  public quantityIsDecimalNumberError: string = '';
  public volumeIsDecimalNumberError: string = '';
  

  public choseImageFilePath: string = '';

  closeMe() {
    this.closeMeEvent.emit();
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

  confirm() {
    this.confirmEvent.emit(this.createdSoapModel);
  }

  fileChangeEvent(fileInput: any) {
    /**
     * 
     * ako odberime slika, soodvetno kje go pokazi imeto od slikata
     * vo inputot. Ako odberime povtorno da odberime slika i stegnime cancel, sekako
     * ova e drug event i kje go fati samata funkcija, no vo inputot vekje ne go cuva
     * imeto na slikata tuku go dava default tekstot koga ne e odbrano nisto "No File chosen",
     * a slikata ostanuva.
     * Probav da go zacuvam patot na samata slika koga se lepi slikata, i koga korisnikot 
     * kje saka da odberi slika i klika "Cancel", da ja stavam povtorno vrednosta od patot na slikata,
     * se pojavu greska od tipot 
     * "This input element accepts a filename, which may only be programmatically set to the empty string"
     * shto znaci deka nemozi da se setira manuelno value na input od tip file.
     * 
     * Od druga strana ovaa logika ne vazi koga se pravi "Remove" na slikata
     * Na "Remove" moze da se setira inputot na prazen string
     * 
     * Posle povekje probuvajna ispagja deka moze da se setira vrednosta na prazen string
     * inputot od tip "file", no nikako nemozi da se setira manuelno
     * 
     */

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
            this.createdSoapModel.url = e.target.result.toString();    
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
    this.createdSoapModel.url = '';
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
