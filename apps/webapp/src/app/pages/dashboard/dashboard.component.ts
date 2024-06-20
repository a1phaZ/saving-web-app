import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import {
  CardComponent,
  ISegmentButtonItem,
  SegmentButtonComponent,
  SidebarBlockComponent,
} from '@tg-web-app/ui';
import { MatIcon } from '@angular/material/icon';
import {
  MatButton,
  MatButtonModule,
  MatIconButton,
} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatProgressBarModule,
    CardComponent,
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

  onSegmentChange(event: any) {
    console.log('segment change', event);
  }
}
