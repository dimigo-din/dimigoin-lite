import { getMyStatusData } from '@/service/myStatus';
import { useCallback, useEffect, useState } from 'react';

export const useMyStatus = () => {
  const [statusData, setStatusData] = useState({
    stay: { status: '미신청', reason: null },
    laundry: '미신청',
    frigo: { status: '미신청', reason: null },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setIsLoading(true);
      }
      const data = await getMyStatusData();
      setStatusData(data);
      setError(null);
    } catch (error) {
      console.error('Failed to fetch status data:', error);
      setError('데이터를 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refreshStatus = () => {
    fetchData(false);
  };

  const getStatusStyle = (status) => {
    if (status === '미신청') {
      return 'text-content-standard-quaternary';
    }
    return 'text-core-accent';
  };

  const renderStatus = (status, content) => {
    if (status === '미신청') {
      return <span className={`text-heading ${getStatusStyle(status)}`}>{content}</span>;
    }
    return <strong className={`text-heading ${getStatusStyle(status)}`}>{content}</strong>;
  };

  return {
    statusData,
    isLoading,
    error,
    getStatusStyle,
    renderStatus,
    refreshStatus,
  };
};
