import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingScreenService } from './loading-screen.service';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as _ from 'lodash';
@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.css']
})
export class LoadingScreenComponent implements OnInit, OnDestroy {

  protected readonly subscriptions: Subscription[] = [];
  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loadingScreenService: LoadingScreenService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.loadingScreenService.loadingStatus.pipe(
        debounceTime(20)
      ).subscribe((value) => {
        this.loading = value;
      })
    );
  }

  ngOnDestroy(): void {
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }
}
