import axiosInstance from '@/lib/axios';
import { setJWTCookie, removeJWTCookie, setRefreshToken, getRefreshToken, removeRefreshToken } from './cookie';

export const logout = async () => {
  await axiosInstance.post('/auth/logout', {
    token: getRefreshToken(),
  });
  removeJWTCookie();
  removeRefreshToken();
  window.location.href = '/login';
};

export const googleLogin = async (code) => {
  try {
    const { data } = await axiosInstance.post('auth/login/web', {
      token: code,
    });
    setJWTCookie(data.accessToken);
    setRefreshToken(data.refreshToken);
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const refreshJWT = async () => {
  try {
    const refreshToken = getRefreshToken();
    const { data } = await axiosInstance.post('/auth/refresh', {
      token: refreshToken,
    });
    setJWTCookie(data.accessToken);
    setRefreshToken(data.refreshToken);
    return data;
  } catch (error) {
    console.error('Refresh token error:', error);
    removeJWTCookie();
    removeRefreshToken();
    throw error;
  }
};
