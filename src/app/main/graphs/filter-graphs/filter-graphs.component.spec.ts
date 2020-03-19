import { Store } from '@ngrx/store';
import { FilterDataService } from '../../../services/filter-data.service';
import { FilterGraphsComponent } from './filter-graphs.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'FilterGraphsComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: FilterGraphsComponent;
  let filterDataServiceMock: any;
  let storeMock: any;

  beforeEach(() => {
    filterDataServiceMock = sinon.createStubInstance(FilterDataService);
    storeMock = sinon.createStubInstance(Store);
    testTarget = new FilterGraphsComponent(filterDataServiceMock, storeMock);
  });

  describe('#filterAnniversary', () => {
    it('should call filterDataServiceMock.changeSourceDataCompare() with []', () => {
      // Act
      testTarget.filterAnniversary();

      // Assert
      sinon.assert.calledWith(filterDataServiceMock.changeSourceDataCompare, []);
    });

    it('should call filterDataServiceMock.changeSourceDataCompare()', () => {
      // Arrange
      testTarget.selectedYear = 2020;
      testTarget.selectedParameters = ['test'];

      // Act
      testTarget.filterAnniversary();

      // Assert
      sinon.assert.called(filterDataServiceMock.changeSourceDataCompare);
    });
  });

  describe('#filterYears', () => {
    it('should call filterDataServiceMock.changeSourceDataCompare() with []', () => {
      // Act
      testTarget.filterYears();

      // Assert
      sinon.assert.calledWith(filterDataServiceMock.changeSourceDataCompare, []);
    });

    it('should call filterDataServiceMock.changeSourceDataCompare()', () => {
      // Arrange
      testTarget.selectedYears = [2020];
      testTarget.selectedParameter = 'test';
      testTarget.listCoasts = [{date: new Date(2020), sum: 1, type: 'test', author: ''}];
      testTarget.listIncomes = [{date: new Date(2020), sum: 1, who: '', type: 'test', author: ''}];

      // Act
      testTarget.filterYears();

      // Assert
      sinon.assert.called(filterDataServiceMock.changeSourceDataCompare);
    });
  });

  describe('#onChange', () => {
    it('should set arrayDataCompare in []', () => {
      // Act
      testTarget.onChange();

      // Assert
      expect(testTarget.arrayDataCompare).to.eql([]);
    });
  });

  describe('#addTagFnYear', () => {
    it('should return { name: "test", tag: true }', () => {
      // Assert
      expect(testTarget.addTagFnYear('test')).to.be.eql({ name: 'test', tag: true });
    });
  });

  describe('#addTagFnParameter', () => {
    it('should return { name: "test", tag: true }', () => {
      // Assert
      expect(testTarget.addTagFnParameter('test')).to.be.eql({ name: 'test', tag: true });
    });
  });
});
