import { encodeUnicode } from './base64';

export const getHttpHeaders = ({ username, password }) => {
  const authorization = encodeUnicode(`${username}:${password}`);

  return {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authorization}`,
  };
};
