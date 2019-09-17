interface Income {
  date: Date;
  sum: number;
  who: string;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?: string;
  position?: number;
}
export class NewIncome implements Income {
  date: Date;
  sum: number;
  who: string;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?: string;
  position?: number;

  constructor(fieldDate: Date,
              fieldSum: number,
              fieldWho: string,
              fieldType: string,
              fieldAuthor: string,
              fieldOther?: string,
              fieldV?: number,
              fieldIdDb?: string,
              fieldPosition?: number) {

    this.date = fieldDate;
    this.sum = fieldSum;
    this.who = fieldWho;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
    this.__v = fieldV;
    this._id = fieldIdDb;
    this.position = fieldPosition;
  }
}
