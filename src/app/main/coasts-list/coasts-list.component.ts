import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewCoast } from '../coast.model';
import { MatSort } from '@angular/material/sort';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-coasts-list',
  templateUrl: './coasts-list.component.html',
  styleUrls: ['./coasts-list.component.css'],
})

export class CoastsListComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['position', 'date', 'sum', 'type', 'other', 'author', 'actions'];

  dataSource: MatTableDataSource<NewCoast>;
  listData: NewCoast[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private dataService: DataService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {
    this.dataService.getAllFieldsCoasts().then(data => {
      data.forEach(obg => obg.position = (data.indexOf(obg) + 1));
      this.listData = data;
      this.createTable(this.listData);
    });
  }

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  createTable(data: NewCoast[]): void {
    this.dataSource = new MatTableDataSource<NewCoast>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteField(fieldDelete: NewCoast): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.fieldDelete = fieldDelete;

    this.subscriptions.push(

      componentRef.instance.deleteItem.subscribe((state: boolean) => {
        if (state) {
          this.listData = this.listData.filter(obg => obg._id !== fieldDelete._id);
          this.createTable(this.listData);
        }

        componentRef.destroy();
        componentRef = null;
      })
    );
  }

  editField(fieldEdit: NewCoast): void {
    this.router.navigate([`/purchases/${fieldEdit._id}`]);
  }
}
