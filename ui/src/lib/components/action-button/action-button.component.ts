import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TActionButton } from '../../types';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'ui-action-button',
  standalone: true,
  imports: [CommonModule, IconComponent],

  templateUrl: './action-button.component.html',
  styleUrl: './action-button.component.scss',
})
export class ActionButtonComponent {
  @Input() button!: TActionButton;

  @Output() buttonClick: EventEmitter<{ path: string; data: any }> =
    new EventEmitter<{ path: string; data: any }>();
}
