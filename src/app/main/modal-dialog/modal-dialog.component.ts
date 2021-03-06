import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCoastState, selectIncomeState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { IncomeState } from '../../store/reducers/income.reducer';
import { DeleteCoast, ClearStateCoast } from '../../store/actions/coast.actions';
import { DeleteIncome, ClearStateIncome } from '../../store/actions/income.actions';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class ModalDialogComponent implements OnInit, OnDestroy {

  @Input() fieldDelete: any;
  @Input() componentList: ElementRef;

  @Output() deleteField: EventEmitter<boolean> = new EventEmitter<boolean>();

  public getStateCoast: Observable<object>;
         getStateIncome: Observable<object>;
         cssHeight: string;
         cssMargTop: string;

  protected readonly subscriptions: Subscription[] = [];

  constructor(protected store: Store<AppState>) {}

  public ngOnInit(): void {
    const heightScreen: number = window.innerHeight;
    const scrollY: number = window.scrollY;
    const heigthListComponent: number = this.componentList.nativeElement.scrollHeight;

    heigthListComponent > (heightScreen - 130) ? this.cssHeight = heigthListComponent + 130 + 'px'
                                               : this.cssHeight = heightScreen + 'px';

    this.cssMargTop = scrollY + Math.floor(heightScreen / 2 - 73) + 'px';

    this.getStateCoast = this.store.select(selectCoastState);
    this.getStateIncome = this.store.select(selectIncomeState);

    this.subscriptions.push(
      this.getStateCoast.subscribe((state: CoastState) => {
        if (state.isDeleted) {
          this.deleteField.emit(true);
        }
      }),

      this.getStateIncome.subscribe((state: IncomeState) => {
        if (state.isDeleted) {
          this.deleteField.emit(true);
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearStateCoast());
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public cancel(): void {
    this.deleteField.emit(false);
  }

  public deleteId(): void {
    this.fieldDelete.who ? this.store.dispatch(new DeleteIncome({ incomeDel: this.fieldDelete }))
                         : this.store.dispatch(new DeleteCoast({ coastDel: this.fieldDelete }));
  }
}
