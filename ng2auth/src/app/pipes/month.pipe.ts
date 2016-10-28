import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Pipe({
  name: 'monthPipe',
  pure: true
})

export class MonthPipe implements PipeTransform {
  transform(input: FirebaseListObservable<any[]>, args1: any, args2: any): any {
    if (!args2) {
      let result = input.map(e => e.filter(this.checkMonth, args1)) as FirebaseListObservable<any[]>;
      return result;
    }
    return input;
  }

  checkMonth(event) {
    let monthToFilter: any = this;
    let month = moment(event.start).month();
    if (month == parseInt(monthToFilter))
    {
      return true;
    }
    return false;
  }

}
