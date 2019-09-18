import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-window',
  templateUrl: './message-window.component.html',
  styleUrls: ['./message-window.component.css']
})
export class MessageWindowComponent {

  @Input() content: string;
  @Input() myClass: string;

  constructor() {}
}
