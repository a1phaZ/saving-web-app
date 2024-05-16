import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFormFieldOptions } from '../../types';
import { FormFieldComponent } from '../base';
import { FieldErrorMessagesComponent } from '../field-error-messages/field-error-messages.component';

@Component({
  selector: 'ui-input-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorMessagesComponent,
  ],
  templateUrl: './input-field.component.html',
  styleUrl: './input-field.component.scss',
})
export class InputFieldComponent extends FormFieldComponent<IFormFieldOptions> {
  // /^[-+]?([0-9]+([\.\,][0-9]*)?|[\.\,][0-9]+)$/
}
