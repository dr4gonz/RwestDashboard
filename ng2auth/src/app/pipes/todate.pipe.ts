import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: string, args?: any): any {
    if(value) {
      return moment(value).format('MM/DD/YYYY');
    }
  }

}
