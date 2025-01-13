import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string | Date): string {
    if (!value) return value as string;

    let timeString: string;
    if (value instanceof Date) {
      timeString = value.toTimeString().split(' ')[0];
    } else {
      timeString = value as string;
    }

    const timeParts = timeString.split(':');
    let hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    let period = 'صباحًا';

    if (hours >= 12) {
      period = 'مساءً';
      if (hours > 12) {
        hours -= 12;
      }
    }
    const timeFormatted = `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    return `${timeFormatted} ${period}`;
  }
}
