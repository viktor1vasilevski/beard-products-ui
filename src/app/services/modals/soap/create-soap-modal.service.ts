import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateSoapModalComponent } from 'src/app/components/modals/soap/create-soap-modal/create-soap-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CreateSoapModalService {

  private componentRef!: ComponentRef<CreateSoapModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(CreateSoapModalComponent);
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
