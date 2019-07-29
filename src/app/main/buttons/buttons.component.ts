import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  add(): void {
    this.router.navigate(['/purchases/new']);
  }

  edit(): void {
    // this.router.navigate(['/purchases/new'])
  }

  getAll(): void {
    this.router.navigate(['/purchases/all']);
  }

}
