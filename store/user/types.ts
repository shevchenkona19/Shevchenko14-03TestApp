export const LOGIN_SEND = 'LOGIN_SEND';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SEND = 'REGISTER_SEND';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

interface LoginSendAction {
  type: typeof LOGIN_SEND;
}

interface LoginFailedAction {
  type: typeof LOGIN_FAILED;
  payload: LoginFailedPayload;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

interface RegisterSendAction {
  type: typeof REGISTER_SEND;
}

interface RegisterFailedAction {
  type: typeof REGISTER_FAILED;
  payload: RegisterFailedPayload;
}

interface RegisterSuccessAction {
  type: typeof REGISTER_SUCCESS;
  payload: RegisterSuccessPayload;
}

export interface RegisterSuccessPayload {
  status: string;
}

export interface RegisterFailedPayload {
  status: string;
  code: number;
  message: string;
}

export interface LoginSuccessPayload {
  status: string;
  token: string;
}

export interface LoginFailedPayload {
  status: string;
  code: number;
  message: string;
}

export type UserActionTypes =
  | LoginSendAction
  | LoginFailedAction
  | LoginSuccessAction
  | RegisterSendAction
  | RegisterFailedAction
  | RegisterSuccessAction;

export interface LoginStore {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
  status: string;
}

export interface RegisterStore {
  isError: boolean;
  errorCode: number;
  errorMessage: string;
  status: string;
}

export interface UserStore {
  login: LoginStore;
  register: RegisterStore;

  token: string;
}
