interface Field {
  position?: number;
  date: Date;
  sum: number;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?: string;
}

export class NewField implements Field {
  position?: number;
  date: Date;
  sum: number;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?: string;

  constructor(fieldDate: Date,
              fieldSum: number,
              fieldType: string,
              fieldAuthor: string,
              fieldOther?: string,
              fieldV?: number,
              fieldIdDb?: string,
              fieldPosition?: number) {

    this.position = fieldPosition;
    this.date = fieldDate;
    this.sum = fieldSum;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
    this.__v = fieldV;
    this._id = fieldIdDb;
  }
}
