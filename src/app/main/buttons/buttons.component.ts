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

  addCoasts(): void {
    this.router.navigate(['/purchases/new']);
  }

  addIncome(): void {
    this.router.navigate(['/income/new']);
  }

  showTableCoasts(): void {
    this.router.navigate(['/purchases/all']);
  }

  showTableIncome(): void {
    // this.router.navigate(['/purchases/all']);
  }

  getStatistics(): void {
    // this.router.navigate(['/purchases/all']);
  }

}
