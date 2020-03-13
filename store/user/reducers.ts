import {UserActionTypes, UserStore} from './types';

const initialState: UserStore = {
  login: {
    isError: false,
    errorCode: 0,
    errorMessage: '',
    status: '',
  },
  register: {
    isError: false,
    errorCode: 0,
    errorMessage: '',
    status: '',
  },

  token: '',
};

export function UserReducer(
  state = initialState,
  action: UserActionTypes,
): UserStore {
  switch (action.type) {
    case 'LOGIN_SEND':
      return {
        ...state,
        login: {
          ...state.login,
          isError: false,
        },
      };
    case 'LOGIN_FAILED':
      return {
        ...state,
        login: {
          ...state.login,
          isError: true,
          errorCode: action.payload.code,
          errorMessage: action.payload.message,
          status: action.payload.status,
        },
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        login: {
          ...state.login,
          status: action.payload.status,
        },
        token: action.payload.token,
      };
    case 'REGISTER_SEND':
      return {
        ...state,
        register: {
          ...state.register,
          isError: false,
        },
      };
    case 'REGISTER_FAILED':
      return {
        ...state,
        register: {
          ...state.register,
          isError: true,
          errorCode: action.payload.code,
          errorMessage: action.payload.message,
          status: action.payload.status,
        },
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        register: {
          ...state.register,
          status: action.payload.status,
        },
      };
    default:
      return state;
  }
}
