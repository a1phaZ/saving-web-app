import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  input,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { DropdownComponent } from '../components';

@Directive({
  selector: '[uiDropdown]',
  standalone: true,
})
export class DropdownDirective {
  options = input<any[]>([]);

  @Output()
  public selectItem: EventEmitter<any> = new EventEmitter<any>();

  private open = false;

  constructor(
    private element: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement) {
    console.log(this.options());

    if (!targetElement) {
      return;
    }
    const clickInside = this.element.nativeElement.contains(targetElement);

    if (!this.open && !clickInside) {
      return;
    }

    if (!this.open) {
      const componentRef =
        this.viewContainerRef.createComponent(DropdownComponent);
      componentRef.instance.options = this.options;
      componentRef.instance.selectItem = this._select.bind(this);
      const host = this.element.nativeElement;

      host.insertBefore(componentRef.location.nativeElement, null);

      this.open = true;
    } else {
      this.open = false;
      this.viewContainerRef.remove();
    }
  }

  private _select(option: any) {
    console.log(option);
    this.selectItem.emit(option);
  }
}
