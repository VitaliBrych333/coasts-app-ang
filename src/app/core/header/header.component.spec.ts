import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from './header.component';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'HeaderComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: HeaderComponent;
  let authServiceMock: any;
  let storeMock: any;

  beforeEach(() => {
    authServiceMock = sinon.createStubInstance(AuthService);
    authServiceMock.getUserPayload = sinon.stub().returns({login: 'test'});
    authServiceMock.currentStatusLog = of(['test']);
    storeMock = sinon.createStubInstance(Store);
    testTarget = new HeaderComponent(authServiceMock, storeMock);
  });

  describe('create element', () => {
    it('should be object', () => {
      // Assert
      expect(testTarget).to.be.an('object');
    });
  });

  describe('#ngOnInit', () => {
    it('should set statusLog in true', () => {
      // Arrange
      authServiceMock.isLoggedIn = sinon.stub().returns(true);

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.statusLog).to.eql(true);
    });

    it('should set statusLog in ["test"]', () => {
      // Arrange
      authServiceMock.isLoggedIn = sinon.stub().returns(false);

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.statusLog).to.eql(['test']);
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

  describe('#logOut', () => {
    it('should call store.dispatch()', () => {
      // Act
      testTarget.logOut();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });
});
