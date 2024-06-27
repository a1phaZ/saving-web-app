import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EFieldTypes, IFormFieldOptions } from '../../types';
import { FormFieldComponent, TextFormControl } from '../base';
import { FieldErrorMessagesComponent } from '../field-error-messages/field-error-messages.component';
import { TranslocoPipe } from '@ngneat/transloco';
import { PatternDirective } from '../../directives';

@Component({
  selector: 'ui-text-form-field-mobile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FieldErrorMessagesComponent,
    TranslocoPipe,
    PatternDirective,
  ],
  templateUrl: './text-form-field-mobile.component.html',
  styleUrl: './text-form-field-mobile.component.scss',
})
export class TextFormFieldMobileComponent
  extends FormFieldComponent<IFormFieldOptions>
  implements OnInit
{
  // /^[-+]?([0-9]+([\.\,][0-9]*)?|[\.\,][0-9]+)$/
  // @Input()
  pattern: string = '';

  override ngOnInit(): void {
    super.ngOnInit();

    const control = this.controlDir.control as TextFormControl;

    this.options = control?.options;

    console.log(this.options.type);
    this.resolvePatternByType(this.options.type);
  }

  public resolvePatternByType(type: EFieldTypes | undefined) {
    switch (type) {
      case EFieldTypes.NUMBER: {
        this.pattern = '^(\\d{1,3}|\\d{0,3}\\.\\d{0,2})$';
        break;
      }
      default: {
        break;
      }
    }
  }
}
