import { HttpHandler, HttpRequest } from '@angular/common/http';
import { of } from 'rxjs/Observable/of';
import { LoadingScreenService } from './loading-screen.service';
import { LoadingScreenInterceptor } from './loading.interceptor';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'LoadingScreenInterceptor';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: LoadingScreenInterceptor;
  let loadingScreenServiceMock: any;

  beforeEach(() => {
    loadingScreenServiceMock = sinon.createStubInstance(LoadingScreenService);
    testTarget = new LoadingScreenInterceptor(loadingScreenServiceMock);
  });

  describe('#intercept', () => {
    it('should set activeRequests in 0', () => {
      // Arrange
      const request = new HttpRequest('GET', '/login');
      const next = { handle: sinon.stub().returns(of(['test'])) } as HttpHandler;

      // Act
      testTarget.intercept(request, next);

      // Assert
      expect(testTarget.activeRequests).to.eql(0);
    });

    it('should set activeRequests in 1', (done) => {
      // Arrange
      const request = new HttpRequest('GET', 'test');
      const next = { handle: sinon.stub().returns(of(['test'])) } as HttpHandler;
      testTarget.activeRequests = 1;

      // Act
      testTarget.intercept(request, next).subscribe(res => done(), err => done());

      // Assert
      expect(testTarget.activeRequests).to.eql(1);
    });

    it('should set activeRequests in 0', (done) => {
      // Arrange
      const request = new HttpRequest('GET', 'test');
      const next = { handle: sinon.stub().returns(of(['test'])) } as HttpHandler;

      // Act
      testTarget.intercept(request, next).subscribe(res => done(), err => done());

      // Assert
      expect(testTarget.activeRequests).to.eql(0);
    });
  });
});
