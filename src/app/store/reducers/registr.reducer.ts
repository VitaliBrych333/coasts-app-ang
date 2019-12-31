import { RegistrActionTypes, All } from '../actions/registr.actions';

export interface RegistrState {
  isRegister: boolean;
  login: string | null;
  errorMessage: string | null;
}

export const initialState: RegistrState = {
  isRegister: false,
  login: null,
  errorMessage: null
};

export function reducerRegistr(state = initialState, action: All): RegistrState {
  switch (action.type) {
    case RegistrActionTypes.REGIN_SUCCESS: {
      return {
        ...state,
        isRegister: true,
        login: action.payload.login,
        errorMessage: null
      };
    }

    case RegistrActionTypes.REGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Duplicate login or registration error.'
      };
    }

    default: {
      return state;
    }
  }
}
