import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { FilterDataService } from '../../../services/filter-data.service';
import { SheduleComponent } from './shedule.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'SheduleComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: SheduleComponent;
  let filterDataServiceMock: any;

  beforeEach(() => {
    filterDataServiceMock = sinon.createStubInstance(FilterDataService);
    testTarget = new SheduleComponent(filterDataServiceMock);
  });

  describe('#ngOnInit', () => {
    it('should be lineChartData an array', () => {
      // Arrange
      filterDataServiceMock.currentDataCompare = of([]);

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.lineChartData).to.be.an('array');
    });

    it('should be lineChartData an array', () => {
      // Arrange
      const testObjOne = new Map();
      const testObjTwo = new Map();
      testObjOne.set(12, 10);
      testObjTwo.set(12, 1);
      filterDataServiceMock.currentDataCompare = of([testObjOne, testObjTwo]);

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.lineChartData).to.be.an('array');
    });

    it('should be lineChartData an array', () => {
      // Arrange
      const testObjOne = new Map();
      const testObjTwo = new Map();
      testObjOne.set(12, 0);
      testObjTwo.set(12, 0);
      filterDataServiceMock.currentDataCompare = of([testObjOne, testObjTwo]);

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.lineChartData).to.be.an('array');
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

  describe('#scale', () => {
    it('should be lineChartOptions an object', () => {
      // Arrange
      testTarget.lineChartOptions = {
        scales: {
          yAxes: [{}, {}]
        }
      };
      testTarget.lineChartData = [{}];

      // Act
      testTarget.scale();

      // Assert
      expect(testTarget.lineChartOptions).to.be.an('object');
    });

    it('should be lineChartOptions an object', () => {
      // Arrange
      testTarget.lineChartData = [{ yAxisID: ''}];
      testTarget.lineChartOptions = {
        scales: {
          yAxes: [{}]
        }
      };
      (testTarget as any).arrayIndexArrayScale = [0];
      testTarget.lineChartColors = [{
        borderColor: 'test'
      }];

      // Act
      testTarget.scale();

      // Assert
      expect(testTarget.lineChartOptions).to.be.an('object');
    });
  });

  describe('#changeColor', () => {
    it('should be lineChartColors 3', () => {
      // Arrange
      (testTarget as any).lineChartColors = 1;
      (testTarget as any).stateFirstColor = 1;
      (testTarget as any).stateSecondColor = 3;
      testTarget.lineChartOptions = {
        scales: {
          yAxes: [{}]
        }
      };

      // Act
      testTarget.changeColor();

      // Assert
      expect((testTarget as any).lineChartColors).to.be.eql(3);
    });

    it('should be lineChartColors {borderColor: "test"}', () => {
      // Arrange
      testTarget.lineChartColors = [{
        borderColor: 'test'
      }];
      (testTarget as any).stateFirstColor = [{
        borderColor: 'test'
      }];
      (testTarget as any).stateSecondColor = [{
        test: 'test'
      }];
      testTarget.lineChartOptions = {
        scales: {
          yAxes: [{}, {}]
        }
      };
      (testTarget as any).arrayIndexArrayScale = [0, 1];

      // Act
      testTarget.changeColor();

      // Assert
      expect(testTarget.lineChartColors).to.be.eql([{borderColor: 'test'}]);
    });
  });
});
