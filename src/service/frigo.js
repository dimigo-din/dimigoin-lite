import axiosInstance from '@/lib/axios';

export const getFrigoData = async () => {
  try {
    const { data } = await axiosInstance.get('/user');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const applyFrigo = async (reason, time) => {
  try {
    const { data } = await axiosInstance.post('/frigo', { reason: `${reason}/${time}` });
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const cancelFriogo = async () => {
  try {
    const { data } = await axiosInstance.delete('/frigo');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};
