import {
  Inject,
  Injectable,
  Injector,
  TemplateRef,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ModalComponent } from '@tg-web-app/ui';

@Injectable()
export class ModalService {
  private _modalNotifier?: Subject<any>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    @Inject(DOCUMENT) private document: Document
  ) {}

  openComponent<C>(
    component: Type<C>,
    options?: { title?: string; data?: any | any[] }
  ) {
    const innerComponent = this.viewContainerRef.createComponent(component, {
      injector: this.injector,
    });
    const modalComponent = this.viewContainerRef.createComponent(
      ModalComponent,
      {
        injector: this.injector,
        projectableNodes: [[innerComponent.location.nativeElement]],
      }
    );

    modalComponent.instance.options = options;
    modalComponent.instance.closeEvent.subscribe(() => {
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe(() => {
      this.submitModal();
    });

    // @ts-ignore
    innerComponent.instance.data = options?.data;
    // @ts-ignore
    innerComponent.instance.itemClick.subscribe((id: string) => {
      this.submitModal(id);
      innerComponent.destroy();
      modalComponent.destroy();
    });

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this._modalNotifier = new Subject();
    return this._modalNotifier?.asObservable();
  }

  openTemplate(
    content: TemplateRef<any>,
    options?: { size?: string; title?: string }
  ) {
    const contentViewRef = content.createEmbeddedView(null);
    const modalComponent = this.viewContainerRef.createComponent(
      ModalComponent,
      {
        injector: this.injector,
        projectableNodes: [contentViewRef.rootNodes],
      }
    );
    modalComponent.instance.options = options;
    modalComponent.instance.closeEvent.subscribe(() => {
      this.closeModal();
    });
    modalComponent.instance.submitEvent.subscribe(() => {
      this.submitModal();
    });

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this._modalNotifier = new Subject();
    return this._modalNotifier?.asObservable();
  }

  closeModal() {
    this._modalNotifier?.complete();
  }

  submitModal(data: any = null) {
    this._modalNotifier?.next(data);
    this.closeModal();
  }
}
