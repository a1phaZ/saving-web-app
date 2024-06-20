import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'ui-card',
  standalone: true,
  imports: [CommonModule, MatButton, MatCardModule, MatIcon, MatDivider],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  card = input({
    header: {
      title: 'spending summary',
      icon: 'money',
      button: {
        text: 'more option',
        icon: 'settings',
      },
    },
  });
}
