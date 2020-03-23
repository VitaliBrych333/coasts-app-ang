import { of } from 'rxjs/Observable/of';
import { Subscription } from 'rxjs';
import { FilterDataService } from '../../../services/filter-data.service';
import { ReportFormComponent } from './report-form.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'ReportFormComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: ReportFormComponent;
  let filterDataServiceMock: any;

  beforeEach(() => {
    filterDataServiceMock = sinon.createStubInstance(FilterDataService);
    testTarget = new ReportFormComponent(filterDataServiceMock);
  });

  describe('#ngOnInit', () => {
    it('should call filterDataService.filter() 28 times', () => {
      // Arrange
      filterDataServiceMock.currentMessageListCoasts = of([{}]);
      filterDataServiceMock.currentMessageListIncomes = of([{}]);
      filterDataServiceMock.filter = sinon.stub().returns(10);

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.callCount(filterDataServiceMock.filter, 28);
    });

    it('should not call filterDataService.filter()', () => {
      // Arrange
      filterDataServiceMock.currentMessageListCoasts = of([]);
      filterDataServiceMock.currentMessageListIncomes = of([]);

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.notCalled(filterDataServiceMock.filter);
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

  describe('#checkValue', () => {
    it('should return false', () => {
      // Assert
      expect(testTarget.checkValue(false)).to.be.eql(false);
    });
  });
});
