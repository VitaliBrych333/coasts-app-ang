import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/Observable/of';
import { AuthInterceptor } from './auth.interceptor';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { Url } from '../../shared/constants/url.enum';
import { fakeAsync, tick } from '@angular/core/testing';
import { throwError } from 'rxjs';

const expect = chai.expect;
const moduleName = 'Log';
const componentName = 'AuthInterceptor';

describe(`${moduleName}.${componentName}`, () => {
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
      const request = new HttpRequest('GET', '/login');
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
  });
});
