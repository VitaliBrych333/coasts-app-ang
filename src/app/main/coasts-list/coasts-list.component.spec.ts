import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { DataService } from '../../services/data.service';
import { CoastsListComponent } from './coasts-list.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'CoastsListComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: CoastsListComponent;
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
    testTarget = new CoastsListComponent(routerMock, dataServiceMock, viewContainerRefMock, componentFactoryResolverMock, storeMock);
  });

  describe('#ngOnInit', () => {
    it('should create dataSource instance of MatTableDataSource', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({coasts: [{}]}));

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.dataSource).to.be.instanceOf(MatTableDataSource);
    });

    it('should not process listData', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({coasts: false}));

      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.listData).to.be.eqls([]);
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

  describe('#editField', () => {
    it('should call router.navigate() by url "/purchases/test"', () => {
      // Arrange
      const editField = {
        date: new Date(),
        sum: 1,
        type: '',
        author: '',
        _id: 'test'
      };

      // Act
      testTarget.editField(editField);

      // Assert
      sinon.assert.calledWith(routerMock.navigate, ['/purchases/test']);
    });
  });

  describe('#deleteField', () => {
    it('should delete by _id', () => {
      // Arrange
      const deleteField = {
        _id: 'test'
      };
      testTarget.listData = [{_id: 'test'}];

      // Act
      testTarget.deleteField(deleteField);

      // Assert
      expect(testTarget.listData).to.be.eqls([]);
    });

    it('should not delete by _id', () => {
      // Arrange
      const deleteField = {
        _id: 'test'
      };

      viewContainerRefMock = {
        createComponent: sinon.stub().returns({
          instance: {
            deleteField: of(false)
          },
          destroy: sinon.spy()
        })
      };

      const testTargetNew = new CoastsListComponent(routerMock, dataServiceMock, viewContainerRefMock,
                                                    componentFactoryResolverMock, storeMock);
      testTargetNew.listData = [{_id: 'test'}];

      // Act
      testTargetNew.deleteField(deleteField);

      // Assert
      expect(testTargetNew.listData).to.be.eqls([{_id: 'test'}]);
    });
  });
});
