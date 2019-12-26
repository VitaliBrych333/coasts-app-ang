import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/state/app.states'
import { LogOut } from '../../store/actions/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];

  statusLog: boolean;
  name: string;

  constructor(private authService: AuthService,
              private router: Router,
              private store: Store<AppState> ) { }

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
    this.store.dispatch(new LogOut());
    // this.authService.deleteToken();
    // this.router.navigate(['/login']);
    // this.authService.changeStatusLog(false);
  }

  ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
