import {post} from './api';

export function fetchLogin(username: string, password: string) {
  return post('/signin', {username, password});
}

export function fetchRegister(username: string, password: string) {
  return post('/signup', {username, password});
}
