import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'ui-page-header',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './page-header.component.html',
  styleUrl: './page-header.component.scss',
})
export class PageHeaderComponent {
  public header = input.required<string>();
  public subHeader = input();
}
