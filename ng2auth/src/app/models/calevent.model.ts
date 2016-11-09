export class CalEvent {
  $key: string;
  start: string;
  end?: string;
  title: string;
  color: any;
  files?: any[];
  allDay?: boolean;
  cssClass?: string;
  createdBy: string;

  constructor(title: string, startDate: string, endDate: string, color: any, files: any[], allDay: boolean, cssClass: string, createdBy: string) {
    this.start = startDate;
    this.end = endDate;
    this.title = title;
    this.color = color;
    this.files = files;
    this.allDay = allDay;
    this.cssClass = cssClass;
    this.createdBy = createdBy;
  }
}
