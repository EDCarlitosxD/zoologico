import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'round',
  standalone: true
})
export class RoundPipe implements PipeTransform {

  transform(value: number, decimals: number = 2): string {
    if (isNaN(value)) return '';
    return value.toFixed(decimals);
  }

}
