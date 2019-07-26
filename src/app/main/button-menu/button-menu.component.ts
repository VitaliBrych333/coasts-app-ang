import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-menu',
  templateUrl: './button-menu.component.html',
  styleUrls: ['./button-menu.component.css']
})
export class ButtonMenuComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit() {
  }

  showMenu(): void {
    this.router.navigate(['/main']);
  }

}
