import { useState, useEffect, useCallback } from 'react';
import { getLaundryData, applyLaundry, cancelLaundry } from "@/service/laundry";
import { toast } from 'react-toastify';

const CURRENT_USER = {
  studentId: '2610',
  name: '서승표',
};

export const useLaundryData = () => {
  const [laundryData, setLaundryData] = useState(null);
  const [selectedTimetable, setSelectedTimetable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState({});

  const fetchLaundryData = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const data = await getLaundryData();
      setLaundryData(data);
      if (data.timetables.length > 0) {
        setSelectedTimetable(prevSelected => {
          if (prevSelected) {
            return data.timetables.find(t => t._id === prevSelected._id) || data.timetables[0];
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
    if (!selectedTimetable) return;

    setLoadingTimeSlots(prev => ({ ...prev, [timeIndex]: true }));

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
      setLoadingTimeSlots(prev => ({ ...prev, [timeIndex]: false }));
    }
  };

  const isTimeSlotReservedByCurrentUser = (timeIndex) => {
    if (!laundryData || !selectedTimetable) return false;
    const application = laundryData.applications.find(app =>
      app.timetable._id === selectedTimetable._id &&
      app.student.name === CURRENT_USER.name &&
      app.time === timeIndex
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
  };
};