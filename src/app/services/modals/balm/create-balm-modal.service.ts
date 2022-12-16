import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { CreateBalmModalComponent } from 'src/app/components/modals/balm/create-balm-modal/create-balm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class CreateBalmModalService {

  private componentRef!: ComponentRef<CreateBalmModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(CreateBalmModalComponent);
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
