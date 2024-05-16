import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() size? = 'md';
  @Input() title? = 'Modal title';

  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<string>();

  constructor(private _elementRef: ElementRef) {}

  close() {
    this._elementRef.nativeElement.remove();
    this.closeEvent.emit();
  }

  submit() {
    this._elementRef.nativeElement.remove();
    this.submitEvent.emit();
  }
}
