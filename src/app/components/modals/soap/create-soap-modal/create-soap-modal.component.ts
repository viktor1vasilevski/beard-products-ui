import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CreateEditSoapModel } from 'src/app/pages/soaps/admin-soaps/create-edit-soap-model';
import * as _ from 'lodash'

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

  public imageError: string | null = '';
  public isImageSaved: boolean = false;
  public cardImageBase64: string | null = '';
  public isImageChosen: boolean = false;
  public priceError: string = ''
  public quantityError: string = ''
  

  public choseImageFilePath: string = '';

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  closeMe() {
    this.closeMeEvent.emit();
  }

  onPriceInput(event: any) {
    this.priceError = '';
  }

  onQuantityInput(event: any) {
    this.quantityError = '';
  }

  confirm() { 
    if(!Number.isInteger(this.createdSoapModel.unitPrice) && !Number.isInteger(this.createdSoapModel.unitQuantity)){
      this.priceError = 'Price must be whole number';
      this.quantityError = 'Quantity must be whole number';
      return
    }

    if(!Number.isInteger(this.createdSoapModel.unitPrice)){
      this.priceError = 'Price must be whole number';
      return
    }

    if(!Number.isInteger(this.createdSoapModel.unitQuantity)){
      this.quantityError = 'Quantity must be whole number';
      return
    }
    
    this.confirmEvent.emit(this.createdSoapModel);
  }

  fileChangeEvent(fileInput: any) {
    /**
     * za da se detektira ovoj event treba da se smeni slikata
     * ako stavime Slika_1, ja trgnime so Remove i ja stavime istata
     * ovoj event nema da se trigerira i Create kopceto kje ostane Disable
     * 
     * Isto taka ako odberime slika, soodvetno kje go pokazi imeto od slikata
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
     */

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
          const img_height = rs.currentTarget['height'];
          const img_width = rs.currentTarget['width'];

          if (img_height > max_height && img_width > max_width) {
            this.imageError = `Maximum dimentions allowed ${max_height}*${max_width}px`;
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

    var nodeList = document.querySelectorAll("input");
    nodeList.forEach((el : any) => {
      if(el.type === 'file'){
        el.value = '';
      } 
    });
    
    this.cardImageBase64 = null;
    this.isImageChosen = false;
    this.createdSoapModel.url = '';
    this.imageError = 'Image is required';
  }
  
}
