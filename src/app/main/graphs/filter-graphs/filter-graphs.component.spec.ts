import { Store } from '@ngrx/store';
import { FilterDataService } from '../../../services/filter-data.service';
import { FilterValue } from '../../../shared/constants/filterValue.enum';
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
    it('should call filterDataService.changeSourceDataCompare() with []', () => {
      // Act
      testTarget.filterAnniversary();

      // Assert
      sinon.assert.calledWith(filterDataServiceMock.changeSourceDataCompare, []);
    });

    it('should call filterDataService.changeSourceDataCompare()', () => {
      // Arrange
      testTarget.selectedYear = 2020;
      testTarget.selectedParameters = ['test'];

      // Act
      testTarget.filterAnniversary();

      // Assert
      sinon.assert.called(filterDataServiceMock.changeSourceDataCompare);
    });
  });

  describe('#filterByKindParameter', () => {
    it('should return array of objects', () => {
      // Arrange
      testTarget.coastsRequired = ['test'];
      const objTestFirst = {date: new Date(2020), sum: 1, type: 'test', author: ''};
      const objTestSecond = {date: new Date(2019), sum: 2, type: 'other', author: ''};
      testTarget.currentListCoasts = [objTestFirst, objTestSecond];

      // Assert
      expect(testTarget.filterByKindParameter('test')).to.be.eql([objTestFirst]);
    });

    it('should return array of objects', () => {
      // Arrange
      testTarget.incomesTotal = ['test'];
      const objTestFirst = {date: new Date(2020), sum: 1, who: '', type: 'test', author: ''};
      const objTestSecond = {date: new Date(2019), sum: 1, who: '', type: 'other', author: ''};
      testTarget.currentListIncomes = [objTestFirst, objTestSecond];

      // Assert
      expect(testTarget.filterByKindParameter('test')).to.be.eql([objTestFirst]);
    });

    it('should call filterDataService.filter()', () => {
      // Arrange
      testTarget.incomesUsers = ['test'];

      // Act
      testTarget.filterByKindParameter('test');

      // Assert
      sinon.assert.called(filterDataServiceMock.filter);
    });

    it('should return array of objects', () => {
      // Arrange
      testTarget.coastsRequired = ['test'];
      const objTestFirst = {date: new Date(2020), sum: 1, type: 'test', author: ''};
      const objTestSecond = {date: new Date(2019), sum: 2, type: 'coasts required', author: ''};
      testTarget.currentListCoasts = [objTestFirst, objTestSecond];

      // Assert
      expect(testTarget.filterByKindParameter(FilterValue.COASTS_REQUIRED)).to.be.eql([objTestFirst]);
    });

    it('should return array of objects', () => {
      // Arrange
      testTarget.coastsOptional = ['test'];
      const objTestFirst = {date: new Date(2020), sum: 1, type: 'test', author: ''};
      const objTestSecond = {date: new Date(2019), sum: 2, type: 'coasts optional', author: ''};
      testTarget.currentListCoasts = [objTestFirst, objTestSecond];

      // Assert
      expect(testTarget.filterByKindParameter(FilterValue.COASTS_OPTIONAL)).to.be.eql([objTestFirst]);
    });

    it('should return array of objects', () => {
      // Arrange
      const objTestFirst = {date: new Date(2020), sum: 1, type: 'test', author: ''};
      testTarget.currentListCoasts = [objTestFirst];

      // Assert
      expect(testTarget.filterByKindParameter(FilterValue.COASTS_TOTAL)).to.be.eql(testTarget.currentListCoasts);
    });

    it('should return array of objects', () => {
      // Arrange
      const objTestFirst = {date: new Date(2020), sum: 1, who: '', type: 'test', author: ''};
      testTarget.currentListIncomes = [objTestFirst];

      // Assert
      expect(testTarget.filterByKindParameter(FilterValue.INCOMES_TOTAL)).to.be.eql(testTarget.currentListIncomes);
    });

    it('should return array of objects', () => {
      // Arrange
      const objTestFirst = {date: new Date(2020), sum: 5, type: 'test', author: ''};
      testTarget.currentListCoasts = [objTestFirst];
      const objTestSecond = {date: new Date(2020), sum: 10, who: '', type: 'test', author: ''};
      testTarget.currentListIncomes = [objTestSecond];

      // Assert
      expect(testTarget.filterByKindParameter(FilterValue.ACCUMULATION)).to.be.an('array');
    });

    it('should return undefined', () => {
      // Assert
      expect(testTarget.filterByKindParameter('test')).to.be.eql(undefined);
    });
  });

  describe('#filterYears', () => {
    it('should call filterDataService.changeSourceDataCompare() with []', () => {
      // Act
      testTarget.filterYears();

      // Assert
      sinon.assert.calledWith(filterDataServiceMock.changeSourceDataCompare, []);
    });

    it('should call filterDataService.changeSourceDataCompare()', () => {
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
