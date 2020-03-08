import { Coast } from '../interfaces/coast.interface';

export class NewCoast implements Coast {
  date: Date;
  sum: number;
  type: string;
  other?: string;
  author: string;
  position?: number;
  __v?: number;
  _id?: string;

  constructor(fieldDate: Date,
              fieldSum: number,
              fieldType: string,
              fieldAuthor: string,
              fieldOther?: string,
              fieldPosition?: number,
              fieldV?: number,
              fieldIdDb?: string) {

    this.date = fieldDate;
    this.sum = fieldSum;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
    this.position = fieldPosition;
    this.__v = fieldV;
    this._id = fieldIdDb;
  }
}
