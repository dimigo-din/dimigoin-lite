import axiosInstance from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { getRefreshToken, removeJWTCookie, removeRefreshToken, setJWTCookie, setRefreshToken } from './cookie';

const storeUserData = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const userData = {
      _id: decodedToken._id,
      name: decodedToken.name,
      email: decodedToken.email,
      grade: decodedToken.grade,
      class: decodedToken.class,
      number: decodedToken.number,
      gender: decodedToken.gender,
      permissions: decodedToken.permissions,
      groups: decodedToken.groups,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error('Error decoding or storing user data:', error);
  }
};

export const logout = async () => {
  const result = await Swal.fire({
    title: '로그아웃',
    text: '정말로 로그아웃 하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '예, 로그아웃합니다',
    cancelButtonText: '아니오',
  });

  if (result.isConfirmed) {
    try {
      await axiosInstance.post('/auth/logout', {
        token: getRefreshToken(),
      });
      removeJWTCookie();
      removeRefreshToken();
      removeUserData();

      window.location.href = '/login';
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
};

export const googleLogin = async (code) => {
  try {
    const { data } = await axiosInstance.post('auth/login/web', {
      token: code,
    });
    setJWTCookie(data.accessToken);
    setRefreshToken(data.refreshToken);
    storeUserData(data.accessToken);
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
    storeUserData(data.accessToken);
    return data;
  } catch (error) {
    console.error('Refresh token error:', error);
    removeJWTCookie();
    removeRefreshToken();
    localStorage.removeItem('userData');
    throw error;
  }
};

export const getUserData = () => {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
};

export const removeUserData = () => {
  localStorage.removeItem('userData');
};
