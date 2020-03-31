import { IncomeActionTypes, AddIncomeSuccess, AddIncomeFailure, LoadSuccess, LoadFailure,
         LoadIncomeByIdSuccess, LoadIncomeByIdFailure, UpdateIncomeSuccess, UpdateIncomeFailure,
         DeleteIncomeSuccess, DeleteIncomeFailure } from './income.actions';

const expect = chai.expect;
const moduleName = 'Store';
const componentName = 'Income.actions';

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: any;
  let payloadMock: any;

  describe('#AddIncomeSuccess', () => {
    it('should return an object with propertie', () => {
      // Arrange
      testTarget = new AddIncomeSuccess();

      // Assert
      expect(testTarget).to.eql({ type: IncomeActionTypes.ADD_INCOME_SUCCESS });
    });
  });

  describe('#AddIncomeFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new AddIncomeFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: IncomeActionTypes.ADD_INCOME_FAILURE });
    });
  });

  describe('#LoadSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { incomes: [] };
      testTarget = new LoadSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { incomes: [] }, type: IncomeActionTypes.LOAD_INCOMES_SUCCESS });
    });
  });

  describe('#LoadFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new LoadFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: IncomeActionTypes.LOAD_INCOMES_FAILURE });
    });
  });

  describe('#LoadIncomeByIdSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { incomeById: {} };
      testTarget = new LoadIncomeByIdSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { incomeById: {} }, type: IncomeActionTypes.LOAD_INCOME_BY_ID_SUCCESS });
    });
  });

  describe('#LoadIncomeByIdFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new LoadIncomeByIdFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: IncomeActionTypes.LOAD_INCOME_BY_ID_FAILURE });
    });
  });

  describe('#UpdateIncomeSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { newValueIncome: {} };
      testTarget = new UpdateIncomeSuccess(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { newValueIncome: {} }, type: IncomeActionTypes.UPDATE_INCOME_SUCCESS });
    });
  });

  describe('#UpdateIncomeFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new UpdateIncomeFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: IncomeActionTypes.UPDATE_INCOME_FAILURE });
    });
  });

  describe('#DeleteIncomeSuccess', () => {
    it('should return an object with properties', () => {
      // Arrange
      testTarget = new DeleteIncomeSuccess();

      // Assert
      expect(testTarget).to.eql({ type: IncomeActionTypes.DELETE_INCOME_SUCCESS });
    });
  });

  describe('#DeleteIncomeFailure', () => {
    it('should return an object with properties', () => {
      // Arrange
      payloadMock = { error: '' };
      testTarget = new DeleteIncomeFailure(payloadMock);

      // Assert
      expect(testTarget).to.eql({ payload: { error: '' }, type: IncomeActionTypes.DELETE_INCOME_FAILURE });
    });
  });
});
