import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setJWTCookie = (token, options = {}) => {
  const oneDay = 24 * 60 * 60 * 1000 * 30;
  return cookies.set('jwt', token, {
    secure: true,
    sameSite: 'strict',
    path: '/',
    expires: new Date(Date.now() + oneDay),
    ...options,
  });
};

export const getJWTCookie = () => {
  return cookies.get('jwt');
};

export const removeJWTCookie = () => {
  return cookies.remove('jwt', { path: '/' });
};

export const setRefreshToken = (token) => {
  localStorage.setItem('refreshToken', token);
};

export const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken');
};
