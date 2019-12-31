import { CoastActionTypes, All } from '../actions/coast.actions';

export interface CoastState {
  isAdded: boolean;
  coast: object | null;
  errorMessage: string | null;
}

export const initialState: CoastState = {
  isAdded: false,
  coast: null,
  errorMessage: null
};

export function reducerCoast(state = initialState, action: All): CoastState {
  switch (action.type) {
    case CoastActionTypes.ADD_COAST_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        coast: action.payload.object,
        errorMessage: null
      };
    }

    case CoastActionTypes.ADD_COAST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not add the coast.'
      };
    }

    default: {
      return state;
    }
  }
}
