import { CoastActionTypes, All } from '../actions/coast.actions';
import { NewCoast } from '../../shared/models/coast.model';

export interface CoastState {
  isAdded: boolean;
  isDeleted: boolean;
  coasts: NewCoast[] | null;
  coastById: NewCoast | null;
  errorMessage: string | null;
}

export const initialState: CoastState = {
  isAdded: false,
  isDeleted: false,
  coasts: null,
  coastById: null,
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

    case CoastActionTypes.LOAD_COAST_BY_ID_SUCCESS: {
      return {
        ...state,
        coastById: action.payload.coastById,
      };
    }

    case CoastActionTypes.LOAD_COAST_BY_ID_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not load a coast by id'
      };
    }

    case CoastActionTypes.UPDATE_COAST_SUCCESS: {
      return {
        ...state,
        isAdded: true,
        coastById: action.payload.newValueCoast
      };
    }

    case CoastActionTypes.UPDATE_COAST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not update a coast.'
      };
    }

    case CoastActionTypes.DELETE_COAST_SUCCESS: {
      return {
        ...state,
        isDeleted: true
      };
    }

    case CoastActionTypes.DELETE_COAST_FAILURE: {
      return {
        ...state,
        errorMessage: 'Can not delete a coast.'
      };
    }

    default: {
      return state;
    }
  }
}
