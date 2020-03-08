import { Income } from '../interfaces/income.interface';

export class NewIncome implements Income {
  date: Date;
  sum: number;
  who: string;
  type: string;
  other?: string;
  author: string;
  position?: number;
  __v?: number;
  _id?: string;

  constructor(fieldDate: Date,
              fieldSum: number,
              fieldWho: string,
              fieldType: string,
              fieldAuthor: string,
              fieldOther?: string,
              fieldPosition?: number,
              fieldV?: number,
              fieldIdDb?: string) {

    this.date = fieldDate;
    this.sum = fieldSum;
    this.who = fieldWho;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
    this.position = fieldPosition;
    this.__v = fieldV;
    this._id = fieldIdDb;
  }
}
