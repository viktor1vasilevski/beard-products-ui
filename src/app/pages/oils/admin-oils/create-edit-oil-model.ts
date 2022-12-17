export class CreateEditOilModel {
    public id?: string;
    public scent: string;
    public liquidVolume: number | null;
    public brand: string;
    public unitPrice: number | null;
    public unitQuantity: number | null;
    public url: string;
    public description: string;
  
    constructor(id: string, scent: string, liquidVolume: number, brand: string, unitPrice: number, unitQuantity: number, url: string, description: string) {
      this.id = id;
      this.scent = scent;
      this.liquidVolume = liquidVolume;
      this.brand = brand;
      this.unitPrice = unitPrice;
      this.unitQuantity = unitQuantity;
      this.url = url;
      this.description = description;
    }
}