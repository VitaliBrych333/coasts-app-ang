import { StatisticsComponent } from './statistics.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'StatisticsComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: StatisticsComponent;

  beforeEach(() => {
    testTarget = new StatisticsComponent();
  });

  describe('create element', () => {
    it('should be {}', () => {
      // Assert
      expect(testTarget).to.eql({});
    });
  });
});
