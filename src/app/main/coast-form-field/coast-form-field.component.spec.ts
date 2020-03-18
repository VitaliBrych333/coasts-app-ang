import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoastFormFieldComponent } from './coast-form-field.component';

const moduleName = 'Main';
const componentName = 'CoastFormFieldComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: CoastFormFieldComponent;
  let fbMock: any;
  let datePipeMock: any;

  beforeEach(() => {
    fbMock = sinon.createStubInstance(FormBuilder);
    datePipeMock = sinon.createStubInstance(DatePipe);
    testTarget = new CoastFormFieldComponent(fbMock, datePipeMock);
  });

  describe('#ngOnChanges', () => {
    it('should call validForm.emit()', () => {
      // Arrange
      const stub = sinon.stub(testTarget.validForm, 'emit');
      testTarget.newField = {
        date: new Date(),
        sum: 1,
        type: '',
        author: ''
      };

      // Act
      testTarget.ngOnChanges();

      // Assert
      sinon.assert.called(stub);
    });
  });
});
