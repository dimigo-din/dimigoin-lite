import axiosInstance from '@/lib/axios';

export const getStayOutgoData = async () => {
  try {
    const { data } = await axiosInstance.get('/user');
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const applyStayOutgo = async (applicationData) => {
  try {
    const { data } = await axiosInstance.post('/stay/outgo', applicationData);
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};

export const cancelStayOutgo = async (stayOutgoId) => {
  try {
    const { data } = await axiosInstance.delete(`/stay/outgo/${stayOutgoId}`);
    return data;
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};
