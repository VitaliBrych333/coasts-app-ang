import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/Observable/of';
import { DataService } from '../../services/data.service';
import { IncomesListComponent } from './incomes-list.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'IncomesListComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: IncomesListComponent;
  let routerMock: any;
  let dataServiceMock: any;
  let viewContainerRefMock: any;
  let componentFactoryResolverMock: any;
  let storeMock: any;

  beforeEach(() => {
    routerMock = sinon.createStubInstance(Router);
    dataServiceMock = sinon.createStubInstance(DataService);
    viewContainerRefMock = {
      createComponent: sinon.stub().returns({
        instance: {
          deleteField: of(true)
        },
        destroy: sinon.spy()
      })
    };
    componentFactoryResolverMock = {
      resolveComponentFactory: sinon.spy()
    };
    storeMock = sinon.createStubInstance(Store);
    testTarget = new IncomesListComponent(routerMock, dataServiceMock, viewContainerRefMock, componentFactoryResolverMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should create dataSource instance of MatTableDataSource', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({incomes: [{}]}));

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.dataSource).to.be.instanceOf(MatTableDataSource);
    });

    it('should not process listData', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({incomes: false}));

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.listData).to.be.eqls([]);
    });
  });

  describe('#editField', () => {
    it('should call router.navigate() by url "/incomes/test"', () => {
      // Arrange
      const editField = {
        date: new Date(),
        sum: 1,
        who: '',
        type: '',
        author: '',
        _id: 'test'
      };

      // Act
      testTarget.editField(editField);

      // Assert
      sinon.assert.calledWith(routerMock.navigate, ['/incomes/test']);
    });
  });
});
