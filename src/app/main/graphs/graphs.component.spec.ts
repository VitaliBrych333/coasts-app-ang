import { GraphsComponent } from './graphs.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'GraphsComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: GraphsComponent;

  beforeEach(() => {
    testTarget = new GraphsComponent();
  });

  describe('create element', () => {
    it('should be {}', () => {
      // Assert
      expect(testTarget).to.eql({});
    });
  });
});
