import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon.component';
import { EIconName, TListItem } from '../../types';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'ui-list-item',
  standalone: true,
  imports: [CommonModule, IconComponent, CurrencyComponent],
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() public item!: TListItem;
  @Input() public last = false;
  @Input() public withArrow = false;

  @Output() public itemClick: EventEmitter<TListItem> =
    new EventEmitter<TListItem>();

  icon: EIconName = EIconName.saxWallet1Outline;
}
