import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import 'rxjs/add/operator/map';
import * as moment from 'moment';

@Pipe({
  name: 'timePipe',
  pure: true
})
export class TimePipe implements PipeTransform {

  transform(input: FirebaseListObservable<any[]>, args: any = 1): any {
    let result = input.map(i => i.sort((a, b) => this.compareDates(a.creationTime, b.creationTime) * args)) as FirebaseListObservable<any[]>;
    return result;
    // JavaScript's sort method expects a callback function that returns -1 if two adjactent
    // items are in the incorrect order, 1 if they are in the correct order, and 0 if they are identical.
    // As such, this pipe expects an argument of either 1 (which it defaults to with no arg) or -1 (or 0).
  }

  compareDates(a: string, b: string): number {
    // Dates are stored in firebase as strings. Here we use moment to cast them to unix
    // timestamps so we can compare them with > and === operators.
    try {
      let aAsInt = moment(a).unix();
      let bAsInt = moment(b).unix();
      if (aAsInt > bAsInt) return 1;
      else if (aAsInt === bAsInt) return 0;
      else return -1;
    } catch(ex) {
      console.log(ex);
      return 0;
    }
  }

}
