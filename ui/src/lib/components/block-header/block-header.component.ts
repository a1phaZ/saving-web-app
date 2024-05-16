import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from '../../directives';

@Component({
  selector: 'ui-block-header',
  standalone: true,
  imports: [CommonModule, DropdownDirective],
  templateUrl: './block-header.component.html',
  styleUrl: './block-header.component.scss',
})
export class BlockHeaderComponent {
  @Input()
  public title = '';

  options = [
    {
      title: 'option 1',
      value: '1',
      selected: true,
    },
    {
      title: 'option 2',
      value: '2',
      selected: true,
    },
  ];

  public selectItem(item: any) {
    console.log(item);
  }
}
