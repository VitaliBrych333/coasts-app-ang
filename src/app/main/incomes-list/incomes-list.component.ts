import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewIncome } from '../income.model';
import { MatSort } from '@angular/material/sort';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ISubscription } from "rxjs/Subscription";

@Component({
  selector: 'app-incomes-list',
  templateUrl: './incomes-list.component.html',
  styleUrls: ['./incomes-list.component.css']
})
export class IncomesListComponent implements OnInit {

  displayedColumns: string[] = ['position', 'date', 'sum', 'who', 'type', 'other', 'author', 'actions'];

  dataSource: MatTableDataSource<NewIncome>;
  listData: NewIncome[];
  subscriptionGetAllFieldsIncomes: ISubscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private dataService: DataService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.subscriptionGetAllFieldsIncomes = this.dataService.getAllFieldsIncomes().subscribe(data => {
      data.forEach(obg => obg.position = (data.indexOf(obg) + 1));
      this.listData = data;
      this.createTable(this.listData);
    })
  }

  ngOnDestroy() {
    this.subscriptionGetAllFieldsIncomes.unsubscribe();
  }

  createTable(data: NewIncome[]): void {
    this.dataSource = new MatTableDataSource<NewIncome>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteField(fieldDelete: NewIncome): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.fieldIncomeDelete = fieldDelete;

    componentRef.instance.deleteItemIcome.subscribe((state: boolean) => {
      if(state) {
        this.listData = this.listData.filter(obg => obg._id !== fieldDelete._id);
        this.createTable(this.listData);
      }

      componentRef.destroy();
      componentRef = null;
    })
  }

  editField(fieldEdit: NewIncome): void {
    this.router.navigate([`/incomes/${fieldEdit._id}`])
  }



}
