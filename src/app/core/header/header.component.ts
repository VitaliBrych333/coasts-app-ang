import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';
import * as _ from 'lodash';

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
  }

  ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
