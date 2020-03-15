import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../../services/auth.service';

const expect = chai.expect;
const moduleName = 'Log';
const componentName = 'AuthGuard';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: AuthGuard;
  let authServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    authServiceMock = sinon.createStubInstance(AuthService);
    routerMock = sinon.createStubInstance(Router);
    testTarget = new AuthGuard(authServiceMock, routerMock);
  });

  describe('#canActivate', () => {
    it('should return true', () => {
      // Arrange
      authServiceMock.isLoggedIn = sinon.stub().returns(true);

      // Assert
      expect(testTarget.canActivate()).to.eql(true);
    });

    it('should return false', () => {
      // Arrange
      authServiceMock.isLoggedIn = sinon.stub().returns(false);

      // Assert
      expect(testTarget.canActivate()).to.eql(false);
    });
  });
});
