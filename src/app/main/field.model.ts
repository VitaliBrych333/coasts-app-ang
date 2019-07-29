interface Field {
  position?: number;
  date: Date;
  price: number;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?:string;

}

export class NewField implements Field {
  position?: number;
  date: Date;
  price: number;
  type: string;
  other?: string;
  author: string;
  __v?: number;
  _id?:string;

  constructor(fieldDate: Date,
              fieldPrice: number,
              fieldType: string,
              fieldAuthor: string,
              fieldOther?: string,
              fieldV?:number,
              fieldIdDb?:string,
              fieldPosition?: number) {

    this.position = fieldPosition;
    this.date = fieldDate;
    this.price = fieldPrice;
    this.type = fieldType;
    this.other = fieldOther;
    this.author = fieldAuthor;
    this.__v = fieldV;
    this._id = fieldIdDb;
  }
}
