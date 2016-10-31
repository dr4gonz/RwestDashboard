import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Pipe({
  name: 'weekPipe',
  pure: true
})

export class WeekPipe implements PipeTransform {
  transform(input: FirebaseListObservable<any[]>, args1: any): any {
    if(args1) {
      let result = input.map(e => e.filter(this.checkWeek, args1)) as FirebaseListObservable<any[]>;
      return result;
    }
    return input;
  }

  checkWeek(event) {
    let weekToFilter: any = this;
    let week = moment(event.start).week();
    if (week == parseInt(weekToFilter))
    {
      return true;
    }
    return false;
  }

}
