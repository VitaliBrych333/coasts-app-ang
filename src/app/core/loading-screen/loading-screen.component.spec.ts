import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { LoadingScreenComponent } from './loading-screen.component';
import { LoadingScreenService } from './loading-screen.service';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'LoadingScreenComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: LoadingScreenComponent;
  let loadingScreenServiceMock: any;

  beforeEach(() => {
    loadingScreenServiceMock = sinon.createStubInstance(LoadingScreenService);
    loadingScreenServiceMock.loadingStatus = of(['test']);
    testTarget = new LoadingScreenComponent(loadingScreenServiceMock);
  });

  describe('create element', () => {
    it('should be object', () => {
      // Assert
      expect(testTarget).to.be.an('object');
    });
  });

  describe('#ngOnInit', () => {
    it('should set loading in ["test"]', () => {
      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.loading).to.eql(['test']);
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
});
