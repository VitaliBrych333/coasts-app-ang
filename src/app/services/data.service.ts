import { Injectable } from '@angular/core';
import { Field } from '../main/field.model';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  sendData(field: Field) {
    console.log(field);
  }
}
