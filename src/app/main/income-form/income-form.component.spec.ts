import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { AuthService } from '../../services/auth.service';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { IncomeFormComponent } from './income-form.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'IncomeFormComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: IncomeFormComponent;
  let datePipeMock: any;
  let routerMock: any;
  let authServiceMock: any;
  let messageMock: any;
  let storeMock: any;

  beforeEach(() => {
    datePipeMock = sinon.createStubInstance(DatePipe);
    routerMock = sinon.createStubInstance(Router);
    authServiceMock = sinon.createStubInstance(AuthService);
    authServiceMock.getUserPayload = sinon.stub().returns({login: 'test'});
    authServiceMock.currentStatusLog = of(['test']);
    messageMock = sinon.createStubInstance(MatDialog);
    messageMock.open = sinon.stub().returns({
      afterClosed: sinon.stub().returns(of('test'))
    });
    storeMock = sinon.createStubInstance(Store);
    testTarget = new IncomeFormComponent(datePipeMock, routerMock, authServiceMock, messageMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should call message.open() with parameter class error', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({errorMessage: true}));
      const testObj = {
        panelClass: 'my-custom-container',
        data: {
          content: 'Error, the income was not saved', class: 'error', time: 800
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.calledWith(messageMock.open, MessageWindowComponent, testObj);
    });

    it('should call message.open() with parameter class success and router.navigate() with ["/main"]', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({isAdded: true}));
      const testObj = {
        panelClass: 'my-custom-container',
        data: {
          content: 'The income was saved successfully', class: 'success', time: 800
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.calledWith(messageMock.open, MessageWindowComponent, testObj);
      sinon.assert.calledWith(routerMock.navigate, ['/main']);
    });

    it('should not call message.open()', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({errorMessage: false}));

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.notCalled(messageMock.open);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe all subscriptions', () => {
      // Arrange
      (testTarget as any).subscriptions = [new Subscription()];

      // Act
      testTarget.ngOnDestroy();

      // Assert
      expect((testTarget as any).subscriptions.every(sub => sub.closed)).to.be.eq(true);
    });
  });

  describe('#validForm', () => {
    it('should set formForValid in {}', () => {
      // Arrange
      const obj = {} as FormGroup;

      // Act
      testTarget.validForm(obj);

      // Assert
      expect((testTarget as any).formForValid).to.be.eq(obj);
    });
  });

  describe('#add', () => {
    it('should call store.dispatch()', () => {
      // Arrange
      (testTarget as any).formForValid = {
        value: {
          date: 2020,
          sum: 10,
          who: '',
          type: '',
          other: ''
        }
      };

      // Act
      testTarget.add();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });
});
