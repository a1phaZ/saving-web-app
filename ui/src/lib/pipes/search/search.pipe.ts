import { Pipe, PipeTransform } from '@angular/core';
import { TListItem } from '@tg-web-app/ui';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(list: TListItem[], searchString: string = ''): TListItem[] {
    return list.filter((item) =>
      item.title?.toLowerCase().includes(searchString.toLowerCase())
    );
  }
}
