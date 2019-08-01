import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  currentUrl: string = this.router.url;
  stateOne: boolean = false;
  stateTwo: boolean = false;
  stateTree: boolean = false;
  stateFour: boolean = false;
  stateFive: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

    switch(this.currentUrl) {
      case '/purchases/new':
        this.stateOne = true;
        break;
      case '/incomes/new':
        this.stateTwo = true;
        break;
      case '/purchases/all':
        this.stateTree = true;
        break;
      case '/incomes/all':
        this.stateFour = true;
        break;
      case '/statistics':
          this.stateFive = true;
          break;
      default:
        // code block
    }

  }

  addCoasts(): void {
    this.router.navigate(['/purchases/new']);

  }

  addIncome(): void {
    this.router.navigate(['/incomes/new']);

  }

  showTableCoasts(): void {
    this.router.navigate(['/purchases/all']);

  }

  showTableIncomes(): void {
    this.router.navigate(['/incomes/all']);

  }

  getStatistics(): void {
    this.router.navigate(['/statistics']);
  }

}
