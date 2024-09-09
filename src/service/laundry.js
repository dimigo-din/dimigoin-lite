import axiosInstance from '@/lib/axios';

export const getLaundryData = async () => {
  try {
    const { data } = await axiosInstance.get('/laundry');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const applyLaundry = async (laundryId, time) => {
  try {
    const { data } = await axiosInstance.post('/laundry', { laundryId, time });
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const cancelLaundry = async () => {
  try {
    const { data } = await axiosInstance.delete('/laundry');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};