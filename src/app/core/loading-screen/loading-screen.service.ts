import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoadingScreenService {

  public loadingStatus: Subject<boolean> = new Subject();

  private _loading: boolean = false;

  public get loading(): boolean {
    return this._loading;
  }

  public set loading(value) {
    this._loading = value;
    this.loadingStatus.next(value);
  }

  public startLoading(): void {
    this.loading = true;
  }

  public stopLoading(): void {
    this.loading = false;
  }
}
