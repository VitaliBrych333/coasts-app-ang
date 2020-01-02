import { CoastActionTypes, All } from '../actions/coast.actions';
import { NewCoast } from '../../main/coast.model';

export interface CoastState {
  isAdded: boolean;
  coasts: NewCoast[] | null,
  errorMessage: string | null;
}

export const initialState: CoastState = {
  isAdded: false,
  coasts: null,
  errorMessage: null
};

export function reducerCoast(state = initialState, action: All): CoastState {
  switch (action.type) {
    case CoastActionTypes.ADD_COAST_SUCCESS: {
      return {
        ...state,
        isAdded: true
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

    case CoastActionTypes.LOAD_COASTS_SUCCESS: {
      return {
        ...state,
        coasts: action.payload.coasts,
      };
    }

    case CoastActionTypes.LOAD_COASTS_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not load the coasts.'
      };
    }

    default: {
      return state;
    }
  }
}
