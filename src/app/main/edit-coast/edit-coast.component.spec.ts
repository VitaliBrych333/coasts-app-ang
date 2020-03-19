import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { EditCoastComponent } from './edit-coast.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'EditCoastComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: EditCoastComponent;
  let authServiceMock: any;
  let activatedRouterMock: any;
  let routerMock: any;
  let messageMock: any;
  let storeMock: any;

  beforeEach(() => {
    authServiceMock = sinon.createStubInstance(Router);
    authServiceMock.getUserPayload = sinon.stub().returns({login: 'test'});
    activatedRouterMock = sinon.createStubInstance(ActivatedRoute);
    activatedRouterMock.snapshot = {
      paramMap: {
        get: sinon.stub().returns('test')
      }
    };
    routerMock = sinon.createStubInstance(Router);
    messageMock = sinon.createStubInstance(MatDialog);
    messageMock.open = sinon.stub().returns({
      afterClosed: sinon.stub().returns(of('test'))
    });
    storeMock = sinon.createStubInstance(Store);
    testTarget = new EditCoastComponent(authServiceMock, activatedRouterMock, routerMock, messageMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should not call messageMock.open()', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({coastById: 10}));

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.notCalled(messageMock.open);
    });

    it('should call message.open() with parameter class success and router.navigate() with ["/purchases/all"]', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({coastById: false, isAdded: true}));
      const testObj = {
        panelClass: 'my-custom-container',
        data: {
          content: 'The purchase was changed successfully', class: 'success', time: 800
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.calledWith(messageMock.open, MessageWindowComponent, testObj);
      sinon.assert.calledWith(routerMock.navigate, ['/purchases/all']);
    });

    it('should call message.open() with parameter class error', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({errorMessage: true}));
      const testObj = {
        panelClass: 'my-custom-container',
        data: {
          content: 'Error, the purchase was not changed', class: 'error', time: 800
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.calledWith(messageMock.open, MessageWindowComponent, testObj);
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

  describe('#save', () => {
    it('should call store.dispatch()', () => {
      // Arrange
      (testTarget as any).formForValid = {
        value: {
          date: 2020,
          sum: 10,
          type: '',
          other: ''
        }
      };

      // Act
      testTarget.save();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });
});
