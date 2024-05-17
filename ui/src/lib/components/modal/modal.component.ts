import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
export interface IModalOptions {
  size?: string;
  title?: string;
  submitButton?: boolean;
  submitButtonLabel?: string;
}
@Component({
  selector: 'ui-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Input() options?: IModalOptions;

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
