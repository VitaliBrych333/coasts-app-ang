import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IncomeFormFieldComponent } from './income-form-field.component';

const moduleName = 'Main';
const componentName = 'IncomeFormFieldComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: IncomeFormFieldComponent;
  let fbMock: any;
  let datePipeMock: any;

  beforeEach(() => {
    fbMock = sinon.createStubInstance(FormBuilder);
    datePipeMock = sinon.createStubInstance(DatePipe);
    testTarget = new IncomeFormFieldComponent(fbMock, datePipeMock);
  });

  describe('#ngOnChanges', () => {
    it('should call validForm.emit()', () => {
      // Arrange
      const stub = sinon.stub(testTarget.validForm, 'emit');
      testTarget.newFieldIncome = {
        date: new Date(),
        sum: 1,
        who: '',
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
