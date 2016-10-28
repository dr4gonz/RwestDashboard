import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toTime'
})
export class ToTimePipe implements PipeTransform {

  transform(value: number, args?: any): any {
    if(value) {
      return moment(value).format('h:mm a');
    }
  }

}
