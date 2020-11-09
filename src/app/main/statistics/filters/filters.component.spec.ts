import { MatInput } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/Observable/of';
import { Subscription } from 'rxjs';
import { FilterDataService } from '../../../services/filter-data.service';
import { FiltersComponent } from './filters.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'FiltersComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: FiltersComponent;
  let filterDataServiceMock: any;
  let storeMock: any;

  beforeEach(() => {
    filterDataServiceMock = sinon.createStubInstance(FilterDataService);
    storeMock = sinon.createStubInstance(Store);
    testTarget = new FiltersComponent(filterDataServiceMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should call store.dispatch()', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({coasts: [{}]}));

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });

    it('should call store.dispatch()', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({incomes: [{}]}));

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });

  describe('#ngOnDestroy', () => {
    it('should unsubscribe all subscriptions', () => {
      // Arrange
      (testTarget as any).subscriptions = [new Subscription()];
      testTarget.inputFrom = { value: '' } as MatInput;
      testTarget.inputTo = { value: '' } as MatInput;

      // Act
      testTarget.ngOnDestroy();

      // Assert
      expect((testTarget as any).subscriptions.every(sub => sub.closed)).to.be.eq(true);
    });
  });

  describe('#setLowDateFilter', () => {
    it('should call filterDataService.filter() twice', () => {
      // Arrange
      const event = { value: 2020 } as any;

      // Act
      testTarget.setLowDateFilter(event);

      // Assert
      sinon.assert.calledTwice(filterDataServiceMock.filter);
    });

    it('should call filterDataService.filter() 4 times', () => {
      // Arrange
      const event = { value: 2020 } as any;
      testTarget.topDateFilter = new Date();

      // Act
      testTarget.setLowDateFilter(event);

      // Assert
      sinon.assert.callCount(filterDataServiceMock.filter, 4);
    });

    it('should not call filterDataService.filter()', () => {
      // Arrange
      const event = { value: null } as any;

      // Act
      testTarget.setLowDateFilter(event);

      // Assert
      sinon.assert.notCalled(filterDataServiceMock.filter);
    });

    it('should call filterDataService.filter() twice', () => {
      // Arrange
      const event = { value: null } as any;
      testTarget.topDateFilter = new Date();

      // Act
      testTarget.setLowDateFilter(event);

      // Assert
      sinon.assert.calledTwice(filterDataServiceMock.filter);
    });
  });

  describe('#setTopDateFilter', () => {
    it('should call filterDataService.filter() twice', () => {
      // Arrange
      const event = { value: 2020 } as any;

      // Act
      testTarget.setTopDateFilter(event);

      // Assert
      sinon.assert.calledTwice(filterDataServiceMock.filter);
    });

    it('should call filterDataService.filter() 4 times', () => {
      // Arrange
      const event = { value: 2020 } as any;
      testTarget.lowDateFilter = new Date();

      // Act
      testTarget.setTopDateFilter(event);

      // Assert
      sinon.assert.callCount(filterDataServiceMock.filter, 4);
    });

    it('should not call filterDataService.filter()', () => {
      // Arrange
      const event = { value: null } as any;

      // Act
      testTarget.setTopDateFilter(event);

      // Assert
      sinon.assert.notCalled(filterDataServiceMock.filter);
    });

    it('should call filterDataService.filter() twice', () => {
      // Arrange
      const event = { value: null } as any;
      testTarget.lowDateFilter = new Date();

      // Act
      testTarget.setTopDateFilter(event);

      // Assert
      sinon.assert.calledTwice(filterDataServiceMock.filter);
    });
  });

  describe('#filterFormMounth', () => {
    it('should call updateDataByMonth()', () => {
      // Arrange
      const stub = sinon.stub(testTarget, 'updateDataByMonth');

      // Act
      testTarget.filterFormMounth([{ id: 'test' }]);

      // Assert
      sinon.assert.called(stub);
    });

    it('should call factoryUpdateData()', () => {
      // Arrange
      testTarget.selectedYear = 2020;
      const stub = sinon.stub(testTarget, 'factoryUpdateData');

      // Act
      testTarget.filterFormMounth([]);

      // Assert
      sinon.assert.called(stub);
    });

    it('should call filterByYearAndByMounth()', () => {
      // Arrange
      testTarget.selectedYear = 2020;
      const stub = sinon.stub(testTarget, 'filterByYearAndByMounth');

      // Act
      testTarget.filterFormMounth([{ id: 'test' }]);

      // Assert
      sinon.assert.called(stub);
    });
  });

  describe('#filterFormYear', () => {
    it('should call factoryUpdateData()', () => {
      // Arrange
      const stub = sinon.stub(testTarget, 'factoryUpdateData');
      testTarget.arrayIdMounths = [1];
      testTarget.currentListCoasts = [{ date: new Date(), sum: 1, type: '', author: '' }];
      testTarget.currentListIncomes = [{ date: new Date(), sum: 1, type: '', who: '', author: '' }];
      testTarget.arrayIdMounths = [1];

      // Act
      testTarget.filterFormYear(2020);

      // Assert
      sinon.assert.called(stub);
    });

    it('should call factoryUpdateData()', () => {
      // Arrange
      const stub = sinon.stub(testTarget, 'factoryUpdateData');

      // Act
      testTarget.filterFormYear(2020);

      // Assert
      sinon.assert.called(stub);
    });

  });

  describe('#addTagFn', () => {
    it('should return { name: "test", tag: true }', () => {
      // Assert
      expect(testTarget.addTagFn('test')).to.be.eql({ name: 'test', tag: true });
    });
  });
});
