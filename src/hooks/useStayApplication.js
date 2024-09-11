import { getUserData } from '@/service/auth';
import { applyStay, cancelStay, getStayData } from '@/service/stay';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const useStayApplication = (refreshMyStatus) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [unselectedReason, setUnselectedReason] = useState('');
  const [stayData, setStayData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [selectableSeats, setSelectableSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [hasExistingApplication, setHasExistingApplication] = useState(false);

  const fetchStayData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const userData = getUserData();
      if (!userData) {
        throw new Error('User data not found');
      }
      setCurrentUser(userData);

      const data = await getStayData();
      setStayData(data);

      const userGradeGender = `${userData.gender}${userData.grade}`;
      const selectableSeats = data.stay.seat[userGradeGender] || [];
      setSelectableSeats(selectableSeats);

      const reserved = data.applications
        .filter((app) => app.seat !== 'NONE')
        .map((app) => ({
          coordinate: app.seat,
          studentId: `${app.student.grade}${app.student.class}${String(app.student.number).padStart(2, '0')}`,
          name: app.student.name,
        }));
      setReservedSeats(reserved);

      const userApplication = data.applications.find((app) => app.student._id === userData._id);
      if (userApplication) {
        setHasExistingApplication(true);
        if (userApplication.seat !== 'NONE') {
          setSelectedSeat(userApplication.seat);
        } else {
          setUnselectedReason(userApplication.reason);
        }
      } else {
        setHasExistingApplication(false);
        setSelectedSeat(null);
        setUnselectedReason('');
      }

      setError(null);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('데이터를 불러오는 데 실패했습니다.');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchStayData();
  }, [fetchStayData]);

  const handleSeatSelect = useCallback(
    (coordinate) => {
      if (!hasExistingApplication && !submitting) {
        setSelectedSeat((prevSeat) => (prevSeat === coordinate ? null : coordinate));
      }
    },
    [hasExistingApplication, submitting],
  );

  const handleUnselectedReasonChange = (e) => {
    if (!hasExistingApplication && !submitting) {
      setUnselectedReason(e.target.value);
    }
  };

  useEffect(() => {
    if (selectedSeat !== null) {
      setUnselectedReason('');
    }
  }, [selectedSeat]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let confirmResult;
    if (hasExistingApplication) {
      confirmResult = await Swal.fire({
        title: '잔류 신청 취소',
        text: '정말로 잔류 신청을 취소하시겠습니까?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '예, 취소합니다',
        cancelButtonText: '아니오',
      });
    } else {
      confirmResult = await Swal.fire({
        title: '잔류 신청',
        text: '잔류 신청을 하시겠습니까?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '예, 신청합니다',
        cancelButtonText: '아니오',
      });
    }

    if (confirmResult.isConfirmed) {
      setSubmitting(true);
      try {
        if (hasExistingApplication) {
          await cancelStay();
          toast.success('잔류 신청이 취소되었습니다.');
        } else {
          const applicationData = {
            seat: selectedSeat || 'NONE',
            reason: selectedSeat ? '' : unselectedReason,
          };
          await applyStay(applicationData);
          toast.success('잔류 신청이 완료되었습니다.');
        }
        await fetchStayData(false);
        refreshMyStatus(); // MyStatus 컴포넌트 리프레시
      } catch (error) {
        console.error('Failed to submit/cancel stay application:', error);
        toast.error(error.message || '잔류 신청 처리 중 오류가 발생했습니다.');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return {
    selectedSeat,
    unselectedReason,
    stayData,
    currentUser,
    reservedSeats,
    selectableSeats,
    loading,
    submitting,
    error,
    hasExistingApplication,
    handleSeatSelect,
    handleUnselectedReasonChange,
    handleSubmit,
    refreshData: fetchStayData,
  };
};
