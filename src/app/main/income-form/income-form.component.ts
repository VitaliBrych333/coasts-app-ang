import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../income.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css'],
  providers: [ DatePipe ],
})
export class IncomeFormComponent implements OnInit {

  infoIncome: object;
  myDate = new Date().toString();

  formForValid: FormGroup;

  constructor(private datePipe: DatePipe,
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.infoIncome = {
      date: this.myDate,
      author: localStorage.getItem('userName'),
      sum: null,
      type: null,
      other: null,
      who: null,
    }
  }

  validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  add() {
    let newFieldIncome: NewIncome = new NewIncome(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.who,
      this.formForValid.value.type,
      localStorage.getItem('userName'),
      this.formForValid.value.other
    );

    this.dataService.addFieldIncome(newFieldIncome).subscribe();
    this.router.navigate(['/main'])
  }

  cancel(): void {
    this.router.navigate(['/main'])
  }

}
