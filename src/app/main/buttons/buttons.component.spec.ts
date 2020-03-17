import { Router } from '@angular/router';
import { ButtonsComponent } from './buttons.component';

const moduleName = 'Main';
const componentName = 'ButtonsComponent';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: ButtonsComponent;
  let routerMock: any;

  beforeEach(() => {
    routerMock = sinon.createStubInstance(Router);
    testTarget = new ButtonsComponent(routerMock);
  });

  describe('#handleClick', () => {
    it('should call with ["test"] parameter', () => {
      // Act
      testTarget.handleClick('test');

      // Assert
      sinon.assert.calledWith(routerMock.navigate, ['test']);
    });
  });
});
