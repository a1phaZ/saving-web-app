import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';

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
  animations: [
    trigger('dialog', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(100%)' }),
        animate('200ms', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [
        animate('200ms', style({ opacity: 0, transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ModalComponent implements OnInit {
  @Input() options?: IModalOptions;

  @Output() closeEvent = new EventEmitter<void>();
  @Output() submitEvent = new EventEmitter<string>();

  public active = false;

  constructor(private _elementRef: ElementRef) {}

  ngOnInit(): void {
    this.active = true;
  }

  close() {
    this.active = false;

    setTimeout(() => {
      this._elementRef.nativeElement.remove();
      this.closeEvent.emit();
    }, 300);
  }

  submit(value: string) {
    this.active = false;

    setTimeout(() => {
      this._elementRef.nativeElement.remove();
      this.submitEvent.emit(value);
    }, 300);
  }
}
