// import { HttpHandler, HttpRequest } from '@angular/common/http';
// import { of } from 'rxjs/Observable/of';
// import { AuthInterceptor } from './auth.interceptor';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';
// import { AuthService } from '../../services/auth.service';
// import { Url } from '../../shared/constants/url.enum';

// const expect = chai.expect;
// const moduleName = 'Log';
// const componentName = 'AuthInterceptor';

// describe(`${moduleName}.${componentName}`, () => {
//   let testTarget: AuthInterceptor;
//   let authServiceMock: any;
//   let routerMock: any;

//   beforeEach(() => {
//     authServiceMock = sinon.createStubInstance(AuthService);
//     routerMock = {
//       navigate: 'test'
//     };
//     testTarget = new AuthInterceptor(authServiceMock, routerMock);
//   });

//   describe('#intercept', () => {
//     it('should set activeRequests in 1', () => {
//       // Arrange
//       const request = new HttpRequest('GET', 'test');
//       const next = { handle: sinon.stub().returns(of(['test'])) } as HttpHandler;
//       const stub = sinon.stub(routerMock, 'navigate')


//       // Act
//       testTarget.intercept(request, next);

//       // Assert
//       sinon.assert.notCalled(stub);
//       // expect(testTarget.activeRequests).to.eql(1);
//     });

//     // it('should set activeRequests in 0', () => {
//     //   // Arrange
//     //   const request = new HttpRequest('GET', '/login');
//     //   const next = { handle: sinon.stub().returns(of(['test'])) } as HttpHandler;

//     //   // Act
//     //   testTarget.intercept(request, next);

//     //   // Assert
//     //   expect(testTarget.activeRequests).to.eql(0);
//     // });
//   });
// });
