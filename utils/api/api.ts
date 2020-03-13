const SERVER_URL = 'http://localhost:3000';

interface Options {
  method: 'POST' | 'PUT' | 'DELETE' | 'GET';
  data: object | undefined;
  token: string | undefined;
  url: string;
}

export interface GetOptions {
  token: string;
}

const request = (options: Options) => {
  return fetch(SERVER_URL + options.url, {
    method: options.method,
    headers: {
      authorization: 'Bearer' + options.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body:
      options.method === 'POST' || options.method === 'PUT'
        ? JSON.stringify(options.data)
        : undefined,
  });
};

export const get = (url: string, options: GetOptions) => {
  return request({
    method: 'GET',
    url,
    data: undefined,
    ...options,
  });
};

export const post = (url: string, body: object, options: any = {}) => {
  return request({
    method: 'POST',
    data: body,
    url,
    ...options,
  });
};

export const _delete = (url: string, options: any = {}) => {
  return request({
    method: 'DELETE',
    url,
    ...options,
  });
};
