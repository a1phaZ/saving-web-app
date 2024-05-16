import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
  public options = input<any[]>([]);

  // @Output()
  // public selectItem: EventEmitter<any> = new EventEmitter<any>();

  selectItem(option: any): void {
    console.log(option);
  }
}
