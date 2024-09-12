import { applyFrigo, cancelFriogo, getFrigoData } from '@/service/frigo';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const useFrigoApplication = (refreshMyStatus) => {
  const [frigoData, setFrigoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reason, setReason] = useState('');
  const [time, setTime] = useState('종례 후');

  useEffect(() => {
    fetchFrigoData();
  }, []);

  const fetchFrigoData = async () => {
    try {
      setLoading(true);
      const data = await getFrigoData();
      setFrigoData(data.frigo);
      if (data.frigo) {
        const [fetchedReason, fetchedTime] = data.frigo.reason.split('/');
        setReason(fetchedReason);
        setTime(fetchedTime);
      }
    } catch (error) {
      toast.error('금요귀가 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    const result = await Swal.fire({
      title: '금요귀가 신청',
      text: '금요귀가를 신청하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: '신청',
      cancelButtonText: '취소',
    });

    if (result.isConfirmed) {
      try {
        await applyFrigo(reason, time);
        await fetchFrigoData();
        toast.success('금요귀가 신청이 완료되었습니다.');
      } catch (error) {
        toast.error('금요귀가 신청에 실패했습니다.');
      }
    }

    refreshMyStatus();
  };

  const handleCancel = async () => {
    const result = await Swal.fire({
      title: '금요귀가 취소',
      text: '금요귀가 신청을 취소하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '취소',
      cancelButtonText: '돌아가기',
    });

    if (result.isConfirmed) {
      try {
        await cancelFriogo();
        await fetchFrigoData();
        toast.success('금요귀가 신청이 취소되었습니다.');
      } catch (error) {
        toast.error('금요귀가 신청 취소에 실패했습니다.');
      }
    }

    refreshMyStatus();
  };

  return {
    frigoData,
    loading,
    reason,
    setReason,
    time,
    setTime,
    handleApply,
    handleCancel,
  };
};
