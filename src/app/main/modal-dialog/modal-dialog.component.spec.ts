import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { of } from 'rxjs/Observable/of';
import { ModalDialogComponent } from './modal-dialog.component';

const expect = chai.expect;
const moduleName = 'Main';
const componentName = 'ModalDialogComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: ModalDialogComponent;
  let storeMock: any;

  beforeEach(() => {
    storeMock = sinon.createStubInstance(Store);
    testTarget = new ModalDialogComponent(storeMock);
  });

  describe('#ngOnInit', () => {
    it('should call deleteField.emit() with true', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({isDeleted: true}));
      const stub = sinon.stub(testTarget.deleteField, 'emit');
      testTarget.componentList = {
        nativeElement: {
          scrollHeight: 0
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.calledWith(stub, true);
    });

    it('should not call deleteField.emit()', () => {
      // Arrange
      storeMock.select = sinon.stub().returns(of({isDeleted: false}));
      const stub = sinon.stub(testTarget.deleteField, 'emit');
      testTarget.componentList = {
        nativeElement: {
          scrollHeight: 700
        }
      };

      // Act
      testTarget.ngOnInit();

      // Assert
      sinon.assert.notCalled(stub);
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

  describe('#cancel', () => {
    it('should call deleteField.emit() with false', () => {
      //Arrange
      const stub = sinon.stub(testTarget.deleteField, 'emit');

      // Act
      testTarget.cancel();

      // Assert
      sinon.assert.calledWith(stub, false);
    });
  });

  describe('#deleteId', () => {
    it('should call store.dispatch()', () => {
      // Arrange
      testTarget.fieldDelete = {
        who: true
      };

      // Act
      testTarget.deleteId();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });

    it('should call store.dispatch()', () => {
      // Arrange
      testTarget.fieldDelete = {
        who: false
      };

      // Act
      testTarget.deleteId();

      // Assert
      sinon.assert.called(storeMock.dispatch);
    });
  });
});
