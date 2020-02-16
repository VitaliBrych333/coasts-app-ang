import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Url } from '../../shared/constants/url.enum';
import { Buttons } from '../../shared/constants/button.enum';
import { Button } from '../../shared/interfaces/button.interface';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})

export class ButtonsComponent {

  public currentUrl: string = this.router.url;
         buttons: Button[] = [
           { title: Buttons.ADDCOAST, link: Url.NEWPURCH },
           { title: Buttons.ADDINCOME, link: Url.NEWINC },
           { title: Buttons.SHOWCOASTS, link: Url.ALLPURCH },
           { title: Buttons.SHOWINCOMES, link: Url.ALLINC },
           { title: Buttons.STATIST, link: Url.STATIST },
           { title: Buttons.GRAPHS, link: Url.GRAPHS }
         ];

  constructor(private router: Router) {}

  public handleClick(url: string): void {
    this.router.navigate([url]);
  }
}
