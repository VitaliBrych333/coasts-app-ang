import { MatDialogRef } from '@angular/material/dialog';
import { NewContent } from '../../models/content.model';
import { MessageWindowComponent } from './message-window.component';

const expect = chai.expect;
const moduleName = 'Shared';
const componentName = 'MessageWindowComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: MessageWindowComponent;
  let dataMock: any;
  let messageRefMock: any;

  beforeEach(() => {
    messageRefMock = sinon.createStubInstance(MatDialogRef);
    dataMock = new NewContent('', '', 10);
    testTarget = new MessageWindowComponent(messageRefMock, dataMock);
  });

  describe('#ngOnInit', () => {
    it('should set time in 10', () => {
      // Act
      testTarget.ngOnInit();

      // Assert
      expect(testTarget.time).to.be.eql(10);
    });
  });
});
