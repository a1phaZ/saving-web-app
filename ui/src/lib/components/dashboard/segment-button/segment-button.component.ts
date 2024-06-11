import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ISegmentButtonItem {
  name: string;
  id: number;
  selected: boolean;
}

@Component({
  selector: 'ui-segment-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './segment-button.component.html',
  styleUrl: './segment-button.component.scss',
})
export class SegmentButtonComponent {
  public items = input([] as ISegmentButtonItem[]);

  onItemClick(id: number) {}
}
