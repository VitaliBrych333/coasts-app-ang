import { AuthActionTypes, LogInSuccess, LogInFailure } from './auth.actions';

const expect = chai.expect;
const moduleName = 'Store';
const componentName = 'Auth.actions';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: any;
  let payloadMock: any;

  describe('#LogInSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { token: '' };
      testTarget = new LogInSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { token: '' }, type: AuthActionTypes.LOGIN_SUCCESS });
    });
  });

  describe('#LogInFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new LogInFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: AuthActionTypes.LOGIN_FAILURE });
    });
  });
});
