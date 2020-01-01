import { CoastActionTypes, All } from '../actions/coast.actions';

export interface CoastState {
  isAdded: boolean;
  errorMessage: string | null;
}

export const initialState: CoastState = {
  isAdded: false,
  errorMessage: null
};

export function reducerCoast(state = initialState, action: All): CoastState {
  switch (action.type) {
    case CoastActionTypes.ADD_COAST_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        errorMessage: null
      };
    }

    case CoastActionTypes.ADD_COAST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not add a coast.'
      };
    }

    case CoastActionTypes.CLEAR_STATE_COAST: {
      return Object.assign({}, initialState);
    }

    default: {
      return state;
    }
  }
}
