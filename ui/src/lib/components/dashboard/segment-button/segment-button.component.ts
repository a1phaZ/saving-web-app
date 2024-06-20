import { Component, input, model, output } from '@angular/core';
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
  public items = model([] as ISegmentButtonItem[], { alias: 'segments' });
  public activeChange = output<number>();

  segmentsChange(id: number) {
    this.items.update((items) => {
      for (const item of items) {
        item.selected = item.id === id;
      }
      return items;
    });

    this.activeChange.emit(id);
  }
}
