import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCoastState, selectIncomeState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { IncomeState } from '../../store/reducers/income.reducer';
import { DeleteCoast, ClearStateCoast } from '../../store/actions/coast.actions';
import { DeleteIncome, ClearStateIncome } from '../../store/actions/income.actions';
import * as _ from 'lodash';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})

export class ModalDialogComponent implements OnInit, OnDestroy {

  @Input() fieldDelete: any;

  @Output() deleteField = new EventEmitter<boolean>();

  protected readonly subscriptions: Subscription[] = [];

  getStateCoast: Observable<object>;
  getStateIncome: Observable<object>;

  constructor(protected store: Store<AppState>) {}

  ngOnInit() {
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

  ngOnDestroy() {
    this.store.dispatch(new ClearStateCoast());
    this.store.dispatch(new ClearStateIncome());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  cancel(): void {
    this.deleteField.emit(false);
  }

  deleteId(): void {
    if (this.fieldDelete.who) {
      this.store.dispatch(new DeleteIncome({ incomeDel: this.fieldDelete }));
    } else {
      this.store.dispatch(new DeleteCoast({ coastDel: this.fieldDelete }));
    }
  }
}
