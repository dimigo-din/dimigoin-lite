import axiosInstance from '@/lib/axios';

export const getStayData = async () => {
  try {
    const { data } = await axiosInstance.get('/stay');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const applyStay = async (applicationData) => {
  try {
    const { data } = await axiosInstance.post('/stay', applicationData);
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const cancelStay = async () => {
  try {
    const { data } = await axiosInstance.delete('/stay');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};
