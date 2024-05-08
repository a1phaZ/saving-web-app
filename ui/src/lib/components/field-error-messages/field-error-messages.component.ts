import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorPipe } from '../../pipes';

@Component({
  selector: 'ui-field-error-messages',
  standalone: true,
  imports: [CommonModule, FieldErrorPipe],
  templateUrl: './field-error-messages.component.html',
  styleUrl: './field-error-messages.component.scss',
})
export class FieldErrorMessagesComponent {
  @Input() errors: { [key: string]: any } = {};
}
