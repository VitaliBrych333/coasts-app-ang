import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { LoadingScreenService } from './loading-screen.service';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
})

export class LoadingScreenComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
         loadingSubscription: Subscription;

  protected readonly subscriptions: Subscription[] = [];

  constructor(private loadingScreenService: LoadingScreenService) {}

  public ngOnInit(): void {
    this.subscriptions.push(
      this.loadingScreenService.loadingStatus.pipe(
        debounceTime(20)
      ).subscribe((value) => {
        this.loading = value;
      })
    );
  }

  public ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
