import { CoastActionTypes, AddCoastSuccess, AddCoastFailure, LoadSuccess, LoadFailure, LoadCoastByIdSuccess, LoadCoastByIdFailure,
         UpdateCoastSuccess, UpdateCoastFailure, DeleteCoastSuccess, DeleteCoastFailure } from './coast.actions';

const expect = chai.expect;
const moduleName = 'Store';
const componentName = 'Coast.actions';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: any;
  let payloadMock: any;

  describe('#AddCoastSuccess', () => {
    it('should return an object with propertie', () => {
      // Arrange
      testTarget = new AddCoastSuccess();

      // Assert
      expect(testTarget).to.eql({ type: CoastActionTypes.ADD_COAST_SUCCESS });
    });
  });

  describe('#AddCoastFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new AddCoastFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: CoastActionTypes.ADD_COAST_FAILURE });
    });
  });

  describe('#LoadSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { coasts: [] };
      testTarget = new LoadSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { coasts: [] }, type: CoastActionTypes.LOAD_COASTS_SUCCESS });
    });
  });

  describe('#LoadFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new LoadFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: CoastActionTypes.LOAD_COASTS_FAILURE });
    });
  });

  describe('#LoadCoastByIdSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { coastById: {} };
      testTarget = new LoadCoastByIdSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { coastById: {} }, type: CoastActionTypes.LOAD_COAST_BY_ID_SUCCESS });
    });
  });

  describe('#LoadCoastByIdFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new LoadCoastByIdFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: CoastActionTypes.LOAD_COAST_BY_ID_FAILURE });
    });
  });

  describe('#UpdateCoastSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { newValueCoast: {} };
      testTarget = new UpdateCoastSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { newValueCoast: {} }, type: CoastActionTypes.UPDATE_COAST_SUCCESS });
    });
  });

  describe('#UpdateCoastFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new UpdateCoastFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: CoastActionTypes.UPDATE_COAST_FAILURE });
    });
  });

  describe('#DeleteCoastSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      testTarget = new DeleteCoastSuccess();

      // Assert
      expect(testTarget).to.eql({ type: CoastActionTypes.DELETE_COAST_SUCCESS });
    });
  });

  describe('#DeleteCoastFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new DeleteCoastFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: CoastActionTypes.DELETE_COAST_FAILURE });
    });
  });
});
