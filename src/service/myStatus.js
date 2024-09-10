import axiosInstance from '@/lib/axios';

const getFrigoStatus = (status) => {
  switch (status) {
    case 'W':
      return '대기중';
    case 'A':
      return '승인됨';
    case 'R':
      return '반려됨';
    default:
      return '알 수 없음';
  }
};

export const getMyStatusData = async () => {
  try {
    const { data } = await axiosInstance.get('/user');
    return {
      stay: data.stay
        ? data.stay.seat === 'NONE'
          ? { status: 'NONE', reason: data.stay.reason }
          : { status: data.stay.seat, reason: null }
        : { status: '미신청', reason: null },
      laundry: data.laundry ? `${data.laundry.timetable.laundry.floor}층 ${data.laundry.time + 1}타임` : '미신청',
      frigo: data.frigo
        ? { status: getFrigoStatus(data.frigo.status), reason: data.frigo.reason }
        : { status: '미신청', reason: null },
    };
  } catch (error) {
    console.error(error);
    throw error.response?.data || error;
  }
};
