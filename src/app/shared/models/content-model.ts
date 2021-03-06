import { DataContent } from '../interfaces/dataContent.interface';

export class NewContent implements DataContent {
  content: string;
  class: string;
  time: number;

  constructor(contentField: string, classField: string, timeField: number ) {
    this.content = contentField;
    this.class = classField;
    this.time = timeField;
  }
}
