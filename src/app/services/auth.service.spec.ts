import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/Observable/of';
import { AuthService } from './auth.service';

const expect = chai.expect;
const moduleName = 'Services';
const componentName = 'AuthService';

const user = {
  login: '',
  password: ''
};

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: AuthService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = sinon.createStubInstance(HttpClient);
    httpMock.post = sinon.stub().returns(of([]));
    testTarget = new AuthService(httpMock);
  });

  describe('#register', () => {
    it('should return a promise', () => {
      // Assert
      expect(testTarget.register(user)).to.be.an('promise');
    });
  });

  describe('#login', () => {
    it('should return a promise', () => {
      // Assert
      expect(testTarget.login(user)).to.be.an('promise');
    });
  });

  describe('#isLoggedIn', () => {
    it('should return boolean value', () => {
      // Act
      testTarget.setToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTdmY2ZmODYwYjE2ODExMThhN2RkNGMiLCJsb2dpbiI6InRlc3QiLCJwYXNzd29yZCI6IiQyYSQxMCR5ajEzTnUydno3UmcxdDVrOGtwMnRPN2N1YTFOM0QxN3liS3Fad1AwTGpGcm9kSlN1UnpnUyIsImlhdCI6MTU4NTQzNTI3OSwiZXhwIjoxNTg1NDM4ODc5fQ.Of8KndTgm4G6BerpaFb7r3b_Fw7j14X9VELG2Tu7t_o');

      // Assert
      expect(testTarget.isLoggedIn()).to.be.an('boolean');
    });

    it('should return false', () => {
      // Act
      testTarget.deleteToken();

      // Assert
      expect(testTarget.isLoggedIn()).to.be.eql(false);
    });
  });

  describe('#changeStatusLog', () => {
    it('should call messageStatusLog.next() with true', () => {
      // Arrange
      const stub = sinon.stub((testTarget as any).messageStatusLog, 'next');

      // Act
      testTarget.changeStatusLog(true);

      // Assert
      sinon.assert.calledWith(stub, true);
    });
  });
});
