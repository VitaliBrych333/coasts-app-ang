import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-form',
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.css']
})
export class ReportFormComponent implements OnInit {
  required: Array<string> = ['Food', 'Rent', 'Child', 'Gym'];
  optional: Array<string> = ['Clothes', 'Petrol', 'Present', 'Other'];
  users: Array<string> = ['Vitali', 'Nastya'];
  constructor() { }

  ngOnInit() {
  }

}
