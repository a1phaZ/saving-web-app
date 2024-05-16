import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldError',
  standalone: true,
})
export class FieldErrorPipe implements PipeTransform {
  transform(
    data: { key: string; value: { [key: string]: any } },
    ...args: unknown[]
  ): unknown {
    const { key, value } = data;
    switch (key) {
      case 'required':
        return 'Обязательное поле';
      case 'max':
        return `Максимально возможное значение ${value['max']}`;
      case 'min':
        return `Минимально возможное значение ${value['min']}`;
      default:
        return 'Неизвестная ошибка';
    }
  }
}
