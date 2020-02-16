import { IncomeActionTypes, All } from '../actions/income.actions';
import { NewIncome } from '../../shared/models/income.model';

export interface IncomeState {
  isAdded: boolean;
  isDeleted: boolean;
  incomes: NewIncome[] | null;
  incomeById: NewIncome | null;
  errorMessage: string | null;
}

export const initialState: IncomeState = {
  isAdded: false,
  isDeleted: false,
  incomes: null,
  incomeById: null,
  errorMessage: null
};

export function reducerIncome(state = initialState, action: All): IncomeState {
  switch (action.type) {
    case IncomeActionTypes.ADD_INCOME_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        errorMessage: null
      };
    }

    case IncomeActionTypes.ADD_INCOME_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not add an income.'
      };
    }

    case IncomeActionTypes.CLEAR_STATE_INCOME: {
      return Object.assign({}, initialState);
    }

    case IncomeActionTypes.LOAD_INCOMES_SUCCESS: {
      return {
        ...state,
        incomes: action.payload.incomes,
      };
    }

    case IncomeActionTypes.LOAD_INCOMES_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not load the incomes.'
      };
    }

    case IncomeActionTypes.LOAD_INCOME_BY_ID_SUCCESS: {
      return {
        ...state,
        incomeById: action.payload.incomeById,
      };
    }

    case IncomeActionTypes.LOAD_INCOME_BY_ID_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not load an income by id'
      };
    }

    case IncomeActionTypes.UPDATE_INCOME_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        incomeById: action.payload.newValueIncome
      };
    }

    case IncomeActionTypes.UPDATE_INCOME_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not update an income.'
      };
    }

    case IncomeActionTypes.DELETE_INCOME_SUCCESS: {
      return {
        ...state,
        isDeleted: true
      };
    }

    case IncomeActionTypes.DELETE_INCOME_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not delete an income.'
      };
    }

    default: {
      return state;
    }
  }
}
