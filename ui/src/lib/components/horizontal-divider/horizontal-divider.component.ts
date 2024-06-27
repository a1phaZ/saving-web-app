import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'ui-horizontal-divider',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './horizontal-divider.component.html',
  styleUrl: './horizontal-divider.component.scss',
})
export class HorizontalDividerComponent {
  text = input<string>('divider.or');
}
