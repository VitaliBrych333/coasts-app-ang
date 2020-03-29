import { FilterDataService } from './filter-data.service';

const expect = chai.expect;
const moduleName = 'Services';
const componentName = 'FilterDataService';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: FilterDataService;

  beforeEach(() => {
    testTarget = new FilterDataService();
  });

  describe('#changeSourceListCoasts', () => {
    it('should call listCoastsSource.next() with parameter', () => {
      // Arrange
      const stub = sinon.stub((testTarget as any).listCoastsSource, 'next');

      // Act
      testTarget.changeSourceListCoasts([{}]);

      // Assert
      sinon.assert.calledWith(stub, [{}]);
    });
  });

  describe('#changeSourceListIncomes', () => {
    it('should call listIncomesSource.next() with parameter', () => {
      // Arrange
      const stub = sinon.stub((testTarget as any).listIncomesSource, 'next');

      // Act
      testTarget.changeSourceListIncomes([{}]);

      // Assert
      sinon.assert.calledWith(stub, [{}]);
    });
  });

  describe('#changeSourceDataCompare', () => {
    it('should call arrayDataCompare.next() with parameter', () => {
      // Arrange
      const stub = sinon.stub((testTarget as any).arrayDataCompare, 'next');

      // Act
      testTarget.changeSourceDataCompare([{}]);

      // Assert
      sinon.assert.calledWith(stub, [{}]);
    });
  });

  describe('#filter', () => {
    it('should return undefined', () => {
      // Assert
      expect(testTarget.filter([{}], 'test', () => {})).to.be.eql(undefined);
    });
  });
});
