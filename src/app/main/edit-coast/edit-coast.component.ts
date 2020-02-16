import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState, selectCoastState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { LoadCoastById, UpdateCoast, ClearStateCoast } from '../../store/actions/coast.actions';
import { AuthService } from '../../services/auth.service';
import { NewCoast } from '../../shared/models/coast.model';
import { NewContent } from '../../shared/models/content.model';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { Url } from '../../shared/constants/url.enum';

@Component({
  selector: 'app-edit-coast',
  templateUrl: './edit-coast.component.html',
  styleUrls: ['./edit-coast.component.scss'],
  providers: [ DatePipe ]
})

export class EditCoastComponent implements OnInit, OnDestroy {

  //public listCategory: Array<string> = ['food', 'rent', 'clothes', 'child', 'petrol', 'present', 'gym', 'other'];
  public editField: object = {
    date: null,
    sum: null,
    author: null,
    type: null,
    other: null
  };

  public formForValid: FormGroup;
         getStateCoast: Observable<object>;

  protected readonly subscriptions: Subscription[] = [];

  private currentFieldEditId: string = this.activatedRouter.snapshot.paramMap.get('id');

  constructor(private authService: AuthService,
              private activatedRouter: ActivatedRoute,
              private router: Router,
              private message: MatDialog,
              protected store: Store<AppState>) {}

  public ngOnInit(): void {
    this.getStateCoast = this.store.select(selectCoastState);

    this.subscriptions.push(
      this.getStateCoast.subscribe((state: CoastState) => {
        if (state.coastById) {
          const editField = Object.assign({}, state.coastById);

          this.editField = {
            date: editField.date,
            sum: editField.sum,
            author: editField.author,
            type: editField.type,
            other: editField.other
          };
        }

        if (state.errorMessage || state.isAdded) {
          let settingMessage: NewContent;

          if (state.errorMessage) {
            settingMessage = { content: 'Error, the purchase was not changed', class: 'error', time: 800 };
          } else {
            settingMessage = { content: 'The purchase was changed successfully', class: 'success', time: 800 };
          }

          const messageWindowRef = this.message.open(MessageWindowComponent, {
            panelClass: 'my-custom-container',
            data: settingMessage
          });

          this.subscriptions.push(
            messageWindowRef.afterClosed().subscribe(() => {
              this.cancel();
            })
          );
        }
      }),
    );

    this.store.dispatch(new LoadCoastById({ Id: this.currentFieldEditId }));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearStateCoast());
    _.forEach(this.subscriptions, subscription => subscription.unsubscribe());
  }

  public validForm(form: FormGroup): void {
    this.formForValid = form;
  }

  public save(): void {
    const newField: NewCoast = new NewCoast(
      this.formForValid.value.date,
      this.formForValid.value.sum,
      this.formForValid.value.type,
      this.authService.getUserPayload().login,
      this.formForValid.value.other
    );

    this.store.dispatch(new UpdateCoast({ Id: this.currentFieldEditId, newValueCoast: newField }));
  }

  public cancel(): void {
    this.router.navigate([Url.ALLPURCH]);
  }
}
