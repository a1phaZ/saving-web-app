import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'ui-balance',
  standalone: true,
  imports: [CommonModule, CurrencyComponent],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.scss',
})
export class BalanceComponent {
  @Input()
  public title = '';
  @Input()
  public value = 0;
}
