import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NewField } from '../field.model';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [DataService, DatePipe]
})
export class EditComponent implements OnInit {

  listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];

  editField: object = {
    date: null,
    price: null,
    author: null,
    type: null,
    other: null
  };

  valid: boolean;

  constructor(private dataService: DataService,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router,) { }

  ngOnInit() {
    const currentFieldEditId = this.router.url.slice(11);

    this.dataService.getFieldId(currentFieldEditId).subscribe(editField => {

      this.editField = {
        date: editField.date,
        price: editField.price,
        author: editField.author,
        type: editField.type,
        other: editField.other
      }
    });
  }

  validForm(form: FormGroup) {
    console.log('wwwwwwwwwwwwww', form)
    if(form.valid) {this.valid = true;} else {
      this.valid = false
    }


  }



}
