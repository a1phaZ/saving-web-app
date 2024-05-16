import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ui-content-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-block.component.html',
  styleUrl: './content-block.component.scss',
})
export class ContentBlockComponent {}
