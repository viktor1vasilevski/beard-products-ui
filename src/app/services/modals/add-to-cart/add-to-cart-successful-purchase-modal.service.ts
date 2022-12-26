import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { AddToCartSuccessfulPurchaseComponent } from 'src/app/components/modals/add-to-cart-successful-purchase/add-to-cart-successful-purchase.component';

@Injectable({
  providedIn: 'root'
})
export class AddToCartSuccessfulPurchaseModalService {

  private componentRef!: ComponentRef<AddToCartSuccessfulPurchaseComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(AddToCartSuccessfulPurchaseComponent);
    this.componentRef = entry.createComponent(factory);
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
