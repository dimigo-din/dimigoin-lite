import { applyStayOutgo, cancelStayOutgo, getStayOutgoData } from '@/service/outgo';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const DEFAULT_START_TIME = '08:00';
const DEFAULT_END_TIME = '23:00';
const SELF_DEVELOPMENT_SETTINGS = {
  reason: '자기계발외출',
  startTime: '10:20',
  endTime: '14:00',
  mealCancel: {
    breakfast: false,
    lunch: true,
    dinner: false,
  },
};

export const useStayOutgo = () => {
  const [stayOutgoData, setStayOutgoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState('');
  const [startTime, setStartTime] = useState(DEFAULT_START_TIME);
  const [endTime, setEndTime] = useState(DEFAULT_END_TIME);
  const [reason, setReason] = useState('');
  const [selectedMeals, setMealCancel] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });
  const [availableDates, setAvailableDates] = useState([]);

  const fetchStayOutgoData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await getStayOutgoData();
      setStayOutgoData(data);
      if (data?.stay?.stay) {
        const dates = data.stay.stay.dates.map((date, index) => ({
          date: date.date,
          free: date.free,
          display: index === 0 ? '토요일 외출' : '일요일 외출',
        }));
        setAvailableDates(dates);
        if (dates.length > 0) {
          setSelectedDay(dates[0].date);
        }
      }
    } catch (err) {
      console.error('Error fetching stay outgo data:', err);
      toast.error('데이터를 불러오는 중 오류가 발생했습니다.');
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStayOutgoData();
  }, [fetchStayOutgoData]);

  const applyForStayOutgo = async (applicationData) => {
    const result = await Swal.fire({
      title: '외출 신청을 하시겠습니까?',
      showCancelButton: true,
      icon: 'question',
      confirmButtonText: '네, 신청합니다',
      cancelButtonText: '아니오',
    });

    if (result.isConfirmed) {
      try {
        const isSelfDevelopment = applicationData.reason === SELF_DEVELOPMENT_SETTINGS.reason;
        const formattedData = {
          ...applicationData,
          free: isSelfDevelopment,
          reason: isSelfDevelopment ? '' : applicationData.reason,
          duration: isSelfDevelopment
            ? {
                start: `${applicationData.date} ${SELF_DEVELOPMENT_SETTINGS.startTime}:00`,
                end: `${applicationData.date} ${SELF_DEVELOPMENT_SETTINGS.endTime}:00`,
              }
            : applicationData.duration,
        };
        await applyStayOutgo(formattedData);
        await fetchStayOutgoData(false);
        toast.success('외출 신청이 완료되었습니다.');
      } catch (err) {
        console.error('Error applying for stay outgo:', err);
        toast.error(err.message);
      }
    }
  };

  const cancelStayOutgoApplication = async (stayOutgoId) => {
    const result = await Swal.fire({
      title: '외출 신청을 취소하시겠습니까?',
      showCancelButton: true,
      icon: 'warning',
      confirmButtonText: '네, 취소합니다',
      cancelButtonText: '아니오',
    });

    if (result.isConfirmed) {
      try {
        await cancelStayOutgo(stayOutgoId);
        await fetchStayOutgoData(false);
        toast.success('외출 신청이 취소되었습니다.');
      } catch (err) {
        console.error('Error cancelling stay outgo application:', err);
        toast.error(`취소 중 오류가 발생했습니다: ${err.message}`);
      }
    }
  };

  const toggleMealCancel = (meal) => {
    setMealCancel((prevMeals) => ({
      ...prevMeals,
      [meal]: !prevMeals[meal],
    }));
  };

  const applyPresetSettings = () => {
    const sundayDate = availableDates.find((date) => new Date(date.date).getDay() === 0);

    if (sundayDate) {
      setSelectedDay(sundayDate.date);
    } else {
      toast.error('일요일 외출이 불가능합니다.');
      return;
    }

    setReason(SELF_DEVELOPMENT_SETTINGS.reason);
    setStartTime(SELF_DEVELOPMENT_SETTINGS.startTime);
    setEndTime(SELF_DEVELOPMENT_SETTINGS.endTime);
    setMealCancel(SELF_DEVELOPMENT_SETTINGS.mealCancel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (availableDates.length === 0) {
      toast.error('신청 가능한 날짜가 없습니다.');
      return;
    }

    const formattedDate = new Date(selectedDay).toISOString().split('T')[0]; // YYYY-MM-DD 형식

    const applicationData = {
      date: formattedDate,
      duration: {
        start: `${formattedDate} ${startTime}:00`,
        end: `${formattedDate} ${endTime}:00`,
      },
      meal: selectedMeals,
      reason: reason,
    };

    await applyForStayOutgo(applicationData);
  };

  return {
    stayOutgoData,
    loading,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    reason,
    setReason,
    selectedMeals,
    availableDates,
    applyForStayOutgo,
    cancelStayOutgoApplication,
    toggleMealCancel,
    applyPresetSettings,
    handleSubmit,
  };
};
