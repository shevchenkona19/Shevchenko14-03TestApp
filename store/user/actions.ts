import {
  LOGIN_FAILED,
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LoginFailedPayload,
  LoginSuccessPayload,
  REGISTER_FAILED,
  REGISTER_SEND,
  REGISTER_SUCCESS,
  RegisterFailedPayload,
  RegisterSuccessPayload,
  UserActionTypes,
} from './types';

export function loginSend(): UserActionTypes {
  return {
    type: LOGIN_SEND,
  };
}

export function loginFailed(payload: LoginFailedPayload): UserActionTypes {
  return {
    type: LOGIN_FAILED,
    payload,
  };
}

export function loginSuccess(payload: LoginSuccessPayload): UserActionTypes {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

export function registerSend(): UserActionTypes {
  return {
    type: REGISTER_SEND,
  };
}

export function registerFailed(
  payload: RegisterFailedPayload,
): UserActionTypes {
  return {
    type: REGISTER_FAILED,
    payload,
  };
}

export function registerSuccess(
  payload: RegisterSuccessPayload,
): UserActionTypes {
  return {
    type: REGISTER_SUCCESS,
    payload,
  };
}
