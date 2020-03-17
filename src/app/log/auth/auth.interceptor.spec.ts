import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { of } from 'rxjs/Observable/of';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthInterceptor } from './auth.interceptor';

const moduleName = 'Log';
const componentName = 'AuthInterceptor';

describe(`${moduleName}.${componentName}`, () => {
  const request = new HttpRequest('GET', '/login');

  let testTarget: AuthInterceptor;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = sinon.createStubInstance(AuthService);
    routerMock = sinon.createStubInstance(Router);
    routerMock.navigate = sinon.spy();
    testTarget = new AuthInterceptor(authServiceMock, routerMock);
  });

  describe('#intercept', () => {
    it('should call router.navigate', (done) => {
      // Arrange
      const customErr = {
        error: {
          auth: false
        }
      };
      const next = { handle: sinon.spy(() => throwError(customErr)) } as HttpHandler;

      // Act
      testTarget.intercept(request, next).subscribe(res => done(), err => done());

      // Assert
      sinon.assert.called(routerMock.navigate);
    });

    it('should not call router.navigate', (done) => {
      // Arrange
      const customErr = {
        error: {
          auth: true
        }
      };
      const next = { handle: sinon.spy(() => throwError(customErr)) } as HttpHandler;

      // Act
      testTarget.intercept(request, next).subscribe(res => done(), err => done());

      // Assert
      sinon.assert.notCalled(routerMock.navigate);
    });

    it('should not call router.navigate', (done) => {
      // Arrange
      const next = { handle: sinon.stub().returns(of([])) } as HttpHandler;

      // Act
      testTarget.intercept(request, next).subscribe(res => done(), err => done());

      // Assert
      sinon.assert.notCalled(routerMock.navigate);
    });
  });
});
