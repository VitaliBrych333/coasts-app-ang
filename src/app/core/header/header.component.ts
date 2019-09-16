import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  statusLog: boolean;
  name: string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.currentStatusLog.subscribe(value => {
        if (this.authService.isLoggedIn()) {
          this.statusLog = true;
          this.name = this.authService.getUserPayload().login;
        } else {
          this.statusLog = value;
        }
      })
    );
  }

  logOut() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
    this.authService.changeStatusLog(false);
  }

  ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
