import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../base';
import { ISwitchFieldOptions } from '../../types';

@Component({
  selector: 'ui-switch-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch-field.component.html',
  styleUrl: './switch-field.component.scss',
})
export class SwitchFieldComponent extends FormFieldComponent<ISwitchFieldOptions> {}
