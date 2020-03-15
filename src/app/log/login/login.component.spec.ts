import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/Observable/of';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

const expect = chai.expect;
const moduleName = 'Log';
const componentName = 'LoginComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: LoginComponent;
  let authServiceMock: any;
  let formBuilderMock: any;
  let routerMock: any;
  let storeMock: any;

  beforeEach(() => {
    authServiceMock = sinon.createStubInstance(AuthService);
    formBuilderMock = sinon.createStubInstance(FormBuilder);
    routerMock = sinon.createStubInstance(Router);
    storeMock = sinon.createStubInstance(Store);
    testTarget = new LoginComponent(formBuilderMock, routerMock, authServiceMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should call setForm', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({errorMessage: true}));
      const stub = sinon.stub(testTarget, 'setForm');

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.called(stub);
    });

    it('should not call setForm and navigate by url "/main"', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({}));
      authServiceMock.isLoggedIn = sinon.stub().returns(true);
      const stub = sinon.stub(testTarget, 'setForm');

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.notCalled(stub);
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

  describe('#signIn', () => {
    it('should call store.dispatch', () => {
      // Arrange
      (testTarget as any).profileForm = {
        controls: {
          login: {
            value: 'test'
          },
          password: {
            value: 'test'
          }
        }
      }

      // Act
      testTarget.signIn();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });

  describe('#register', () => {
    it('should call store.dispatch', () => {
      // Arrange
      (testTarget as any).profileForm = {
        controls: {
          login: {
            value: 'test'
          },
          password: {
            value: 'test'
          }
        }
      }

      // Act
      testTarget.register();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });

  describe('#setForm', () => {
    it('should set profileForm in undefined', () => {
      // Act
      testTarget.setForm();

      // Assert
      expect(testTarget.profileForm).to.be.eql(undefined);
    });
  });
});
