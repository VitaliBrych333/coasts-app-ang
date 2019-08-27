import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewField } from '../field.model';
import { MatSort } from '@angular/material/sort';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ISubscription } from 'rxjs/Subscription';
/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css'],
})

export class FieldListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'date', 'sum', 'type', 'other', 'author', 'actions'];

  dataSource: MatTableDataSource<NewField>;
  listData: NewField[];
  subscriptionGetAllFields: ISubscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private router: Router,
              private dataService: DataService,
              private viewContainerRef: ViewContainerRef,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.subscriptionGetAllFields = this.dataService.getAllFields().subscribe(data => {
      data.forEach(obg => obg.position = (data.indexOf(obg) + 1));
      this.listData = data;
      this.createTable(this.listData);
    });
  }

  ngOnDestroy() {
    this.subscriptionGetAllFields.unsubscribe();
  }

  createTable(data: NewField[]): void {
    this.dataSource = new MatTableDataSource<NewField>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  deleteField(fieldDelete: NewField): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
    let componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.fieldDelete = fieldDelete;

    componentRef.instance.deleteItem.subscribe((state: boolean) => {
      if (state) {
        this.listData = this.listData.filter(obg => obg._id !== fieldDelete._id);
        this.createTable(this.listData);
      }

      componentRef.destroy();
      componentRef = null;
    });
  }

  editField(fieldEdit: NewField): void {
    this.router.navigate([`/purchases/${fieldEdit._id}`]);
  }



}

