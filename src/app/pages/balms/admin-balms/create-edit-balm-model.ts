export class CreateEditBalmModel {
    public id?: string;
    public brand: string;
    public volume: number | null;
    public unitPrice: number | null;
    public unitQuantity: number | null;
    public url: string;
    public description: string;
  
    constructor(id: string, brand: string, volume: number, unitPrice: number, unitQuantity: number, url: string, description: string) {
      this.id = id;
      this.brand = brand;
      this.volume = volume;
      this.unitPrice = unitPrice;
      this.unitQuantity = unitQuantity;
      this.url = url;
      this.description = description;
    }
}