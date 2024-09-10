import { getMyStatusData } from '@/service/myStatus';
import { useEffect, useState } from 'react';

export const useMyStatus = () => {
  const [statusData, setStatusData] = useState({
    stay: { status: '로딩중...', reason: null },
    laundry: '로딩중...',
    frigo: { status: '로딩중...', reason: null },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMyStatusData();
        setStatusData(data);
      } catch (error) {
        console.error('Failed to fetch status data:', error);
      }
    };

    fetchData();
  }, []);

  const getStatusStyle = (status) => {
    if (status === '미신청' || status === '로딩중...') {
      return 'text-content-standard-quaternary';
    }
    return 'text-core-accent';
  };

  const renderStatus = (status, content) => {
    if (status === '미신청' || status === '로딩중...') {
      return <span className={`text-heading ${getStatusStyle(status)}`}>{content}</span>;
    }
    return <strong className={`text-heading ${getStatusStyle(status)}`}>{content}</strong>;
  };

  return {
    statusData,
    getStatusStyle,
    renderStatus,
  };
};
