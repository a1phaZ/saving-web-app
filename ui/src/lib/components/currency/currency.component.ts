import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TgFinAppCurrencyPipe } from '../../pipes';

@Component({
  selector: 'ui-currency',
  standalone: true,
  imports: [CommonModule, TgFinAppCurrencyPipe],
  templateUrl: './currency.component.html',
  styleUrl: './currency.component.scss',
})
export class CurrencyComponent {
  @Input()
  public value = 0;
  @Input()
  public size = 44;
}
