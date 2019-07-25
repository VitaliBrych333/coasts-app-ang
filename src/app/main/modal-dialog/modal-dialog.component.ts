import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewField } from '../field.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent {
  @Input() fieldDelete: NewField;
  @Output() deleteItem = new EventEmitter<boolean>()

  constructor(private dataService: DataService) { }

  cancel(): void {
    this.deleteItem.emit(false);
  }

  deleteId(): void {
    this.dataService.deleteId(this.fieldDelete).subscribe();
    this.deleteItem.emit(true);
  }



}


