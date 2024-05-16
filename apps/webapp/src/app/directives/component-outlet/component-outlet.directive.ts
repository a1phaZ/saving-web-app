import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnDestroy,
  Output,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[tgFinAppComponentOutlet]',
  standalone: true,
})
export class ComponentOutletDirective<T> implements AfterViewInit, OnDestroy {
  @Input() component!: Type<T>;
  @Input() injector!: Injector;
  @Output() create = new EventEmitter<ComponentRef<T>>();
  @Output() destroy = new EventEmitter<ComponentRef<T>>();

  private componentRef!: ComponentRef<T>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private elRef: ElementRef,
    private globalInjector: Injector
  ) {
    this.injector = globalInjector;
  }

  ngAfterViewInit() {
    const injector = this.injector || this.globalInjector;
    const factory = this.resolver.resolveComponentFactory(this.component);
    this.componentRef = this.viewContainerRef.createComponent(
      factory,
      0,
      injector
    );

    this.elRef.nativeElement.appendChild(
      this.componentRef.location.nativeElement
    );
    this.create?.emit(this.componentRef);
  }

  ngOnDestroy(): void {
    this.destroy?.emit(this.componentRef);
  }
}
