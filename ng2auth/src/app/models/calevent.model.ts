export class CalEvent {
  $key: string;
  start: string;
  end?: string;
  title: string;
  color: any;
  actions?: any[];
  allDay?: boolean;
  cssClass?: string;
  createdBy: string;

  constructor(title: string, startDate: string, endDate: string, color: any, actions: any[], allDay: boolean, cssClass: string, createdBy: string) {
    this.start = startDate;
    this.end = endDate;
    this.title = title;
    this.color = color;
    this.actions = actions;
    this.allDay = allDay;
    this.cssClass = cssClass;
    this.createdBy = createdBy;
  }
}
