import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ElementRef } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCoastState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { LoadCoasts, ClearStateCoast } from '../../store/actions/coast.actions';
import { ClearStateIncome } from '../../store/actions/income.actions';
import { DataService } from '../../services/data.service';
import { NewCoast } from '../../shared/models/coast.model';
import { Url } from '../../shared/constants/url.enum';
import { ColumnNames } from '../../shared/constants/columnNamesForm';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-coasts-list',
  templateUrl: './coasts-list.component.html',
  styleUrls: ['./coasts-list.component.scss'],
})

export class CoastsListComponent implements OnInit, OnDestroy {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('componentList', {static: true}) componentList: ElementRef;

  public displayedColumns: string[] = [...ColumnNames];

  public dataSource: MatTableDataSource<object>;
         listData: object[] = [];
         getStateCoast: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  constructor(public router: Router,
              public dataService: DataService,
              public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver,
              protected store: Store<AppState>) {}

  public ngOnInit(): void {
    this.getStateCoast = this.store.select(selectCoastState);

    this.subscriptions.push(
      this.getStateCoast.subscribe((state: CoastState) => {
        if (state.coasts) {
          this.listData = [];
          state.coasts.forEach((obj: NewCoast) => this.listData.push(Object.assign({}, obj)));
          this.listData.forEach((obj: NewCoast) => obj.position = (this.listData.indexOf(obj) + 1));
          this.createTable(this.listData);
        }
      }),
    );

    this.store.dispatch(new LoadCoasts());
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearStateCoast());
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public createTable(data: object[]): void {
    this.dataSource = new MatTableDataSource<object>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public deleteField(fieldDelete: any): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalDialogComponent);
    const componentRef = this.viewContainerRef.createComponent(componentFactory);

    componentRef.instance.fieldDelete = fieldDelete;
    componentRef.instance.componentList = this.componentList;

    this.subscriptions.push(

      componentRef.instance.deleteField.subscribe((state: boolean) => {
        if (state) {
          this.listData = this.listData.filter((obj: any) => obj._id !== fieldDelete._id);
          this.createTable(this.listData);
        }

        componentRef.destroy();
      })
    );
  }

  public editField(fieldEdit: NewCoast): void {
    this.router.navigate([`${Url.PURCH}/${fieldEdit._id}`]);
  }
}
