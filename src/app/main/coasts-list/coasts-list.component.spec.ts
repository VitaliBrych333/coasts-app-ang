import { FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { AuthService } from '../../services/auth.service';
import { MessageWindowComponent } from '../../shared/components/message-window/message-window.component';
import { CoastsListComponent } from './coasts-list.component';


import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnDestroy, ElementRef } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';


import { AppState, selectCoastState } from '../../store/state/app.states';
import { CoastState } from '../../store/reducers/coast.reducer';
import { LoadCoasts, ClearStateCoast } from '../../store/actions/coast.actions';
import { ClearStateIncome } from '../../store/actions/income.actions';
import { DataService } from '../../services/data.service';
import { NewCoast } from '../../shared/models/coast.model';
import { Url } from '../../shared/constants/url.enum';
import { ColumnNames } from '../../shared/constants/columnNamesForm';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';

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
          deleteField: of([])
        }
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
    it('should set formForValid in {}', () => {
      // Arrange
      const deleteField = {
        _id: 'test'
      };

      // Act
      testTarget.deleteField(deleteField);

      // Assert
      expect(testTarget.listData).to.be.eqls([]);
    });
  });
});
