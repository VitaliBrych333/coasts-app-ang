import { IncomeActionTypes, All } from '../actions/income.actions';
import { NewIncome } from '../../main/income.model';

export interface IncomeState {
  isAdded: boolean;
  incomes: NewIncome[] | null,
  errorMessage: string | null;
}

export const initialState: IncomeState = {
  isAdded: false,
  incomes: null,
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

    default: {
      return state;
    }
  }
}
