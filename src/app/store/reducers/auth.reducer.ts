import { AuthActionTypes, All } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  errorMessage: null
};

export function reducerAuth(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        errorMessage: null
      };
    }

    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        errorMessage: 'Incorrect login and/or password.'
      };
    }

    default: {
      return state;
    }
  }
}
