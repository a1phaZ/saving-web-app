import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoPipe } from '@ngneat/transloco';

interface ICalendarOptions {
  value?: string;
}

@Component({
  selector: 'ui-calendar',
  standalone: true,
  imports: [CommonModule, TranslocoPipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent {
  public date!: Date;
  public year!: number;
  public month!: number;
  public monthName!: string;
  public currentDay!: number;
  public calendar: number[] = [];
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() set data(data: ICalendarOptions) {
    this.date = data?.value ? new Date(data.value) : new Date();
    this.month = this.date.getMonth();
    this.monthName = this.date.toLocaleDateString('en', { month: 'long' });
    this.year = this.date.getFullYear();
    this.currentDay = this.date.getDate();

    this.calendar = this.getCalendar(this.year, this.month);
  }

  public onDayClick(day: number): void {
    if (day === this.currentDay) {
      return;
    }
    this.currentDay = day;
    // console.log(day, new Date(this.year, this.month, day).toLocaleDateString());
    this.valueChange.emit(`${this.year}-${this.month + 1}-${day}`);
  }

  private getCalendar(year: number, month: number): number[] {
    const daysCount = new Date(year, month + 1, 0).getDate();
    const result: number[] = [];
    for (let i = 0; i < daysCount; i++) {
      result.push(i + 1);
    }
    return result;
  }
}
