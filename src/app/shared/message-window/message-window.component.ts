import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewContent } from '../content-model';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.scss']
})

export class MessageWindowComponent implements OnInit {

  content: string;
  myClass: string;
  time: number;

  constructor(
    public messageRef: MatDialogRef<MessageWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: NewContent) {}

  ngOnInit() {
    this.content = this.data.content;
    this.myClass = this.data.class;
    this.time = this.data.time;
    setTimeout(() => this.messageRef.close(), this.time);
  }
}
