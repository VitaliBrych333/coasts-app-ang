import { NoContentComponent } from './no-content.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'NoContentComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: NoContentComponent;

  beforeEach(() => {
    testTarget = new NoContentComponent();
  });

  describe('create element', () => {
    it('should be {}', () => {
      // Assert
      expect(testTarget).to.eql({});
    });
  });
});
