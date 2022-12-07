export class CreateEditSoapModel {
    public id?: string;
    public brand: string;
    public edition: string;
    public unitPrice: number | null;
    public unitQuantity: number | null;
    public url: string;
    public description: string;
  
    constructor(id: string, brand: string, edition: string, unitPrice: number, unitQuantity: number, url: string, description: string) {
      this.id = id;
      this.brand = brand;
      this.edition = edition;
      this.unitPrice = unitPrice;
      this.unitQuantity = unitQuantity;
      this.url = url;
      this.description = description;
    }
}