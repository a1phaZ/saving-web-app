import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from '../../list-item/list-item.component';
import { TListItem } from '../../../types';

@Component({
  selector: 'ui-select-field-values-list',
  standalone: true,
  imports: [CommonModule, ListItemComponent],
  templateUrl: './select-field-values-list.component.html',
  styleUrl: './select-field-values-list.component.scss',
})
export class SelectFieldValuesListComponent {
  @Input() data: TListItem[] = [];

  @Output() itemClick: EventEmitter<string> = new EventEmitter<string>();

  public onItemClick(item: TListItem): void {
    this.itemClick.emit(item.id);
  }
}
