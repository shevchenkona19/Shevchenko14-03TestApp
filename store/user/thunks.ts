import {AppThunk} from '../index';
import {
  loginFailed,
  loginSend,
  loginSuccess,
  registerFailed,
  registerSend,
  registerSuccess,
} from './actions';
import {fetchLogin, fetchRegister} from '../../utils/api/user';

export const login = (
  username: string,
  password: string,
): AppThunk => async dispatch => {
  dispatch(loginSend());
  try {
    const res = await fetchLogin(username, password);
    const json = await res.json();
    if (json.status === 'ok') {
      dispatch(loginSuccess(json));
    } else {
      dispatch(loginFailed(json));
    }
  } catch (e) {
    dispatch(loginFailed(e));
  }
};

export const register = (
  username: string,
  password: string,
): AppThunk => async dispatch => {
  dispatch(registerSend());
  try {
    const res = await fetchRegister(username, password);
    const json = await res.json();
    if (json.status === 'ok') {
      dispatch(registerSuccess(json));
    } else {
      dispatch(registerFailed(json));
    }
  } catch (e) {
    dispatch(registerFailed(e));
  }
};
