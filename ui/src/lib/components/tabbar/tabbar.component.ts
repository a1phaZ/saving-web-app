import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'tg-fin-app-tabbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslocoModule],
  templateUrl: './tabbar.component.html',
  styleUrl: './tabbar.component.scss',
})
export class TabbarComponent {}
