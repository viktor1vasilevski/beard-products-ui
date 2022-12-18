import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { DeleteBalmModalComponent } from 'src/app/components/modals/balm/delete-balm-modal/delete-balm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteBalmModalService {

  private componentRef!: ComponentRef<DeleteBalmModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef, modalTitle: string, modalSubTitle: string, quantity: any, price: any, imageUrl: string) {
    let factory = this.resolver.resolveComponentFactory(DeleteBalmModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.title = modalTitle;
    this.componentRef.instance.subTitle = modalSubTitle;
    this.componentRef.instance.quantity = quantity;
    this.componentRef.instance.price = price;
    this.componentRef.instance.imageUrl = imageUrl;
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe((response) => this.confirm(response));
    this.componentSubscriber = new Subject<string>();
    return this.componentSubscriber.asObservable();
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(response: any) {
    this.componentSubscriber.next(response);
    this.closeModal();
  }
}
