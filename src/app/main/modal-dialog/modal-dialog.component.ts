import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent {

  @Input() fieldDelete: any;

  @Output() deleteField = new EventEmitter<boolean>();

  constructor(private dataService: DataService) {}

  cancel(): void {
    this.deleteField.emit(false);
  }

  deleteId(): void {
    if (this.fieldDelete.who) {
      this.dataService.deleteIncomeId(this.fieldDelete).then(() => this.deleteField.emit(true));
    } else {
      this.dataService.deleteId(this.fieldDelete).then(() => this.deleteField.emit(true));
    }
  }
}
