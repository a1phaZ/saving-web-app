import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {
  saxAddCircleOutline,
  saxMoneyChangeOutline,
  saxMoneyReciveOutline,
  saxMoneySendOutline,
  saxWallet1Outline,
  saxWalletMoneyOutline,
  saxArrangeCircle2Outline,
  saxPresentionChartOutline,
  saxBillOutline,
  saxCalendar1Outline,
} from '@ng-icons/iconsax/outline';
import { EIconName } from '../../types';

@Component({
  selector: 'ui-icon',
  standalone: true,
  imports: [NgIconComponent, CommonModule],
  viewProviders: [
    provideIcons({
      saxMoneyReciveOutline,
      saxMoneySendOutline,
      saxMoneyChangeOutline,
      saxWalletMoneyOutline,
      saxWallet1Outline,
      saxAddCircleOutline,
      saxArrangeCircle2Outline,
      saxPresentionChartOutline,
      saxBillOutline,
      saxCalendar1Outline,
    }),
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() icon!: EIconName;
  @Input() size!: string;
}
