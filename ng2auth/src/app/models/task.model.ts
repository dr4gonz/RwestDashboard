export class Task {
  $key: string;
  description: string;
  date: string;
  isDone: boolean;

  constructor(description: string, date: string) {
    this.description = description;
    this.date = date;
    this.isDone = false;
  }
}
