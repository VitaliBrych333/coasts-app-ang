interface DataContent {
  content: string;
  class: string;
}
export class NewContent implements DataContent {
  content: string;
  class: string;

  constructor(contentField: string, classField: string ) {
    this.content = contentField;
    this.class = classField;
  }
}
