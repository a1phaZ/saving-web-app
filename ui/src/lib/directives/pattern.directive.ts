import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[uiPattern]',
  standalone: true,
})
export class PatternDirective {
  private specialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'Delete',
    'ArrowLeft',
    'ArrowRight',
  ];

  @Input('uiPattern') pattern!: string;

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const key = event.key;
    if (this.specialKeys.indexOf(key) !== -1) {
      return;
    }
    const value = (event.target as HTMLInputElement).value;
    const valueString = value + key;
    if (this.pattern && this.pattern !== '') {
      let patternRegExp: RegExp = new RegExp(this.pattern, 'g');

      if (!patternRegExp.test(valueString)) {
        event.preventDefault();
        return;
      }
    }
  }
}
