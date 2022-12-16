import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateOilModalComponent } from 'src/app/components/modals/oil/create-oil-modal/create-oil-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CreateOilModalService {

  private componentRef!: ComponentRef<CreateOilModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(CreateOilModalComponent);
    this.componentRef = entry.createComponent(factory);
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
