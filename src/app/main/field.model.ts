interface Field {
  id: number;
  date: Date;
  price: number;
  type: string;
  other?: string;
  author: string;
}

export class NewField implements Field {
  id: number;
  date: Date;
  price: number;
  type: string;
  other?: string;
  author: string;

  constructor(fieldId: number, fieldDate: Date, fieldPrice: number, fieldType: string, fieldAuthor: string, fieldOther?: string) {
    this.id = fieldId;
    this.date = fieldDate;
    this.price = fieldPrice;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
  }
}
