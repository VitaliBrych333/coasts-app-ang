import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/state/app.states';
import { LogOut } from '../../store/actions/auth.actions';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnDestroy {

  public statusLog: boolean;
         name: string;

  protected readonly subscriptions: Subscription[] = [];

  constructor(private authService: AuthService,
              private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.statusLog = false;
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

  public logOut(): void {
    this.store.dispatch(new LogOut());
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
