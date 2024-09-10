import { getUserData } from '@/service/auth';
import { applyLaundry, cancelLaundry, getLaundryData } from '@/service/laundry';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export const useLaundryData = () => {
  const [laundryData, setLaundryData] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState({});
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userData = getUserData();
    if (userData) {
      setCurrentUser({
        studentId: `${userData.grade}${userData.class}${userData.number.toString().padStart(2, '0')}`,
        name: userData.name,
      });
    }
  }, []);

  const fetchLaundryData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const data = await getLaundryData();
      setLaundryData(data);
      if (data.timetables.length > 0) {
        setSelectedTimetable((prevSelected) => {
          if (prevSelected) {
            return data.timetables.find((t) => t._id === prevSelected._id) || data.timetables[0];
          }
          return data.timetables[0];
        });
      }
    } catch (err) {
      toast.error(err.message || '데이터를 불러오는 데 실패했습니다.');
    } finally {
      if (showLoading) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchLaundryData();
  }, [fetchLaundryData]);

  const handleTimetableChange = (timetable) => {
    setSelectedTimetable(timetable);
  };

  const handleTimeSelect = async (timeIndex) => {
    if (!selectedTimetable || !currentUser) return;

    setLoadingTimeSlots((prev) => ({ ...prev, [timeIndex]: true }));

    try {
      if (isTimeSlotReservedByCurrentUser(timeIndex)) {
        await cancelLaundry();
        toast.success('예약이 취소되었습니다.');
      } else {
        await applyLaundry(selectedTimetable.laundry._id, timeIndex);
        toast.success('예약이 완료되었습니다.');
      }

      await fetchLaundryData(false);
    } catch (err) {
      toast.error(err.message || '예약 변경에 실패했습니다.');
    } finally {
      setLoadingTimeSlots((prev) => ({ ...prev, [timeIndex]: false }));
    }
  };

  const isTimeSlotReservedByCurrentUser = (timeIndex) => {
    if (!laundryData || !selectedTimetable || !currentUser) return false;
    const application = laundryData.applications.find(
      (app) =>
        app.timetable._id === selectedTimetable._id && app.student.name === currentUser.name && app.time === timeIndex,
    );
    return !!application;
  };

  return {
    laundryData,
    selectedTimetable,
    loading,
    loadingTimeSlots,
    handleTimetableChange,
    handleTimeSelect,
    isTimeSlotReservedByCurrentUser,
    refreshData: fetchLaundryData,
    currentUser,
  };
};
