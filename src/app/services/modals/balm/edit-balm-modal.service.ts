import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { EditBalmModalComponent } from 'src/app/components/modals/balm/edit-balm-modal/edit-balm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class EditBalmModalService {

  private componentRef!: ComponentRef<EditBalmModalComponent>;
  private componentSubscriber!: Subject<string>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef, model: any) {
    let factory = this.resolver.resolveComponentFactory(EditBalmModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.model = model;
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
