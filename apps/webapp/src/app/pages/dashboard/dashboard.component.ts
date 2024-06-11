import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import {
  ISegmentButtonItem,
  SegmentButtonComponent,
  SidebarBlockComponent,
} from '@tg-web-app/ui';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'webapp-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    SidebarBlockComponent,
    MatSidenavContainer,
    MatSidenav,
    MatIcon,
    MatButton,
    MatIconButton,
    SegmentButtonComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  public fastPeriodChangeItems: ISegmentButtonItem[] = [
    {
      id: 0,
      name: '12 M',
      selected: false,
    },
    {
      id: 1,
      name: '1 M',
      selected: false,
    },
    {
      id: 2,
      name: '7 D',
      selected: true,
    },
    {
      id: 3,
      name: '24 H',
      selected: false,
    },
  ];
}
