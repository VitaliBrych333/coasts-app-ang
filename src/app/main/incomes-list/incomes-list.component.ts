import { Component, OnInit, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../income.model';
import { CoastsListComponent } from '../coasts-list/coasts-list.component'

@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.css']
})

export class IncomesListComponent extends CoastsListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'date', 'sum', 'who', 'type', 'other', 'author', 'actions'];

  constructor(public router: Router,
              public dataService: DataService,
              public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver)
              { super(router, dataService, viewContainerRef, componentFactoryResolver); }

  ngOnInit() {
    this.dataService.getAllFieldsIncomes().then(data => {
      data.forEach(obg => obg.position = (data.indexOf(obg) + 1));
      this.listData = data;
      this.createTable(this.listData);
    });
  }

  editField(fieldEdit: NewIncome): void {
    this.router.navigate([`/incomes/${fieldEdit._id}`]);
  }
}
