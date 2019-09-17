import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NewField } from '../field.model';
import { NewIncome } from '../income.model';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent implements OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  @Input() fieldDelete: NewField;
  @Input() fieldIncomeDelete: NewIncome;

  @Output() deleteItem = new EventEmitter<boolean>();
  @Output() deleteItemIcome = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {}

  ngOnDestroy() {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  cancel(): void {
    if (this.fieldDelete) {
       this.deleteItem.emit(false);
    }
    if (this.fieldIncomeDelete) {
      this.deleteItemIcome.emit(false);
    }
  }

  deleteId(): void {
    if (this.fieldDelete) {
      this.subscriptions.push(
        this.dataService.deleteId(this.fieldDelete).subscribe()
      );
      this.deleteItem.emit(true);
    }

    if (this.fieldIncomeDelete) {
      this.subscriptions.push(
        this.dataService.deleteIncomeId(this.fieldIncomeDelete).subscribe()
      );
      this.deleteItemIcome.emit(true);
    }
  }
}
