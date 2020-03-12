import { FooterComponent } from './footer.component';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'FooterComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: FooterComponent;

  beforeEach(() => {
    testTarget = new FooterComponent();
  });

  describe('create element', () => {
    it('should be {}', () => {
      // Assert
      expect(testTarget).to.eql({});
    });
  });
});
