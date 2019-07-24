import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NewField } from '../field.model';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})

export class ModalDialogComponent {
  @Input() fieldDelete: NewField;
  @Output() deleteItem = new EventEmitter()

  constructor() { }

  cancel(): void {
    this.deleteItem.emit();
  }

  deleteId(): void {
    console.log(this.fieldDelete);
    this.deleteItem.emit();
  }



}


