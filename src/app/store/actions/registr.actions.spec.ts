import { RegistrActionTypes, RegInSuccess, RegInFailure } from './registr.actions';

const expect = chai.expect;
const moduleName = 'Store';
const componentName = 'Registr.actions';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: any;
  let payloadMock: any;

  describe('#RegInSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { login: '' };
      testTarget = new RegInSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { login: '' }, type: RegistrActionTypes.REGIN_SUCCESS });
    });
  });

  describe('#RegInFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new RegInFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: RegistrActionTypes.REGIN_FAILURE });
    });
  });
});
