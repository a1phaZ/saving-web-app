import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFormFieldOptions } from '../../types';
import { FormFieldComponent } from '../base';
import { FieldErrorMessagesComponent } from '../field-error-messages/field-error-messages.component';

@Component({
  selector: 'ui-input-bot-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorMessagesComponent,
  ],
  templateUrl: './input-bot-field.component.html',
  styleUrl: './input-bot-field.component.scss',
})
export class InputBotFieldComponent extends FormFieldComponent<IFormFieldOptions> {
  // /^[-+]?([0-9]+([\.\,][0-9]*)?|[\.\,][0-9]+)$/
}
