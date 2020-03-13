import { LoadingScreenService } from './loading-screen.service';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'LoadingScreenService';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: LoadingScreenService;

  beforeEach(() => {
    testTarget = new LoadingScreenService();
  });

  describe('#loading', () => {
    it('should return false ', () => {
      // Assert
      expect(testTarget.loading).to.eql(false);
    });
  });

  describe('#startLoading', () => {
    it('should set _loading in true ', () => {
      // Act
      testTarget.startLoading();

      // Assert
      expect((testTarget as any)._loading).to.eql(true);
    });
  });

  describe('#stopLoading', () => {
    it('should set _loading in false ', () => {
      // Act
      testTarget.stopLoading();

      // Assert
      expect((testTarget as any)._loading).to.eql(false);
    });
  });
});
