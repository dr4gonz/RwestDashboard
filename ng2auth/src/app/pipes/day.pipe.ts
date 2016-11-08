import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Pipe({
  name: 'dayPipe',
  pure: true
})

export class DayPipe implements PipeTransform {
  transform(input: FirebaseListObservable<any[]>, args1: any): any {
    if(args1) {
      let result = input.map(e => e.filter(this.checkDay, args1)) as FirebaseListObservable<any[]>;
      return result;
    }
    return input;
  }

  checkDay(event) {
    let dayToFilter: any = this;
    let startDay = moment(event.start).dayOfYear();
    let endDay = moment(event.end).dayOfYear();
    if (moment(dayToFilter).isBetween(startDay, endDay, null, '[]'))
    {
      return true;
    }
    return false;
  }

}
