import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldErrorMessagesComponent } from '../../field-error-messages/field-error-messages.component';
import { FormFieldComponent, TextFormControl } from '../../base';
import { ITextFormFieldOptions } from '../../../types';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'ui-text-form-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorMessagesComponent,
    MatIcon,
  ],
  templateUrl: './text-form-field.component.html',
  styleUrl: './text-form-field.component.scss',
})
export class TextFormFieldComponent
  extends FormFieldComponent<ITextFormFieldOptions>
  implements OnInit
{
  override ngOnInit(): void {
    super.ngOnInit();

    const control = this.controlDir.control as TextFormControl;

    this.options = control.options;
    console.log(this.controlDir);
  }
}
