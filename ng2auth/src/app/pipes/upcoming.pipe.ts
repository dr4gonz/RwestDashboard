import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Pipe({
  name: 'upcoming',
  pure: true
})

export class UpcomingPipe implements PipeTransform {
  transform(input: FirebaseListObservable<any[]>, args1: any): any {
    let result = input.map(t => t.filter(this.checkWeek)) as FirebaseListObservable<any[]>;
    return result;
  }

  checkWeek(task) {
    let weekToFilter = moment().week();
    let week = moment(task.date).week();
    if (week == weekToFilter)
    {
      return true;
    }
    return false;
  }

}
