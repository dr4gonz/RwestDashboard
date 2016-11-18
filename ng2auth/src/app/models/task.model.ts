export class Task {
  $key: string;
  description: string;
  date: string;
  isDone: boolean;
  projectId: string;

  constructor(description: string, date: string, id?: string) {
    this.description = description;
    this.date = date;
    this.isDone = false;
    this.projectId = id;
  }
}
