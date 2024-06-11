import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatList,
  MatListItem,
  MatListSubheaderCssMatStyler,
} from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'ui-sidebar-block',
  standalone: true,
  imports: [
    CommonModule,
    MatList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    RouterLinkActive,
    RouterLink,
  ],
  templateUrl: './sidebar-block.component.html',
  styleUrl: './sidebar-block.component.scss',
})
export class SidebarBlockComponent {}
