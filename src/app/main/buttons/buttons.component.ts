import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Url } from '../../shared/constants/url-enum';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent implements OnInit {

  private currentUrl: string = this.router.url;
  private stateOne: boolean = false;
  private stateTwo: boolean = false;
  private stateTree: boolean = false;
  private stateFour: boolean = false;
  private stateFive: boolean = false;
  private stateSix: boolean = false;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    switch (this.currentUrl) {
      case Url.NEWPURCH:
        this.stateOne = true;
        break;
      case Url.NEWINC:
        this.stateTwo = true;
        break;
      case Url.ALLPURCH:
        this.stateTree = true;
        break;
      case Url.ALLINC:
        this.stateFour = true;
        break;
      case Url.STATIST:
        this.stateFive = true;
        break;
      case Url.GRAPHS:
        this.stateSix = true;
        break;
      default:
    }
  }

  public addCoasts(): void {
    this.router.navigate([Url.NEWPURCH]);
  }

  public addIncome(): void {
    this.router.navigate([Url.NEWINC]);
  }

  public showTableCoasts(): void {
    this.router.navigate([Url.ALLPURCH]);
  }

  public showTableIncomes(): void {
    this.router.navigate([Url.ALLINC]);
  }

  public getStatistics(): void {
    this.router.navigate([Url.STATIST]);
  }

  public showGraphs(): void {
    this.router.navigate([Url.GRAPHS]);
  }
}
