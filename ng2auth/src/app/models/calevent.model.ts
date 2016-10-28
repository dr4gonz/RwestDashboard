export class CalEvent {
  $key: string;
  start: number;
  end?: number;
  title: string;
  color: any;
  actions?: any[];
  allDay?: boolean;
  cssClass?: string;

  constructor(title: string, startDate: number, endDate: number, color: any, actions: any[], allDay: boolean, cssClass: string) {
    this.start = startDate;
    this.end = endDate;
    this.title = title;
    this.color = color;
    this.actions = actions;
    this.allDay = allDay;
    this.cssClass = cssClass;
  }
}
