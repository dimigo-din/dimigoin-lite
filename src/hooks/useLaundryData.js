import { getUserData } from '@/service/auth';
import { applyLaundry, cancelLaundry, getLaundryData } from '@/service/laundry';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export const useLaundryData = () => {
  const [laundryData, setLaundryData] = useState(null);
  const [selectedWasher, setSelectedWasher] = useState(null);
  const [selectedDryer, setSelectedDryer] = useState(null);
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

      const washers = data.timetables.filter((t) => Number(t.laundry.floor) < 10);
      const dryers = data.timetables.filter((t) => Number(t.laundry.floor) >= 10);

      if (washers.length > 0) {
        setSelectedWasher((prevSelected) =>
          prevSelected ? washers.find((w) => w._id === prevSelected._id) || washers[0] : washers[0],
        );
      }
      if (dryers.length > 0) {
        setSelectedDryer((prevSelected) =>
          prevSelected ? dryers.find((d) => d._id === prevSelected._id) || dryers[0] : dryers[0],
        );
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

  const handleTimetableChange = (timetable, isWasher) => {
    if (isWasher) {
      setSelectedWasher(timetable);
    } else {
      setSelectedDryer(timetable);
    }
  };

  const handleTimeSelect = async (timeIndex, isWasher) => {
    const selectedMachine = isWasher ? selectedWasher : selectedDryer;
    if (!selectedMachine || !currentUser) return;

    setLoadingTimeSlots((prev) => ({ ...prev, [timeIndex]: true }));

    try {
      if (isTimeSlotReservedByCurrentUser(timeIndex, isWasher)) {
        const result = await Swal.fire({
          title: '예약 취소',
          text: '정말로 예약을 취소하시겠습니까?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: '예, 취소합니다',
          cancelButtonText: '아니오',
        });

        if (result.isConfirmed) {
          await cancelLaundry();
          toast.success('예약이 취소되었습니다.');
        } else {
          return;
        }
      } else {
        await applyLaundry(selectedMachine.laundry._id, timeIndex);
        toast.success('예약이 완료되었습니다.');
      }
    } catch (err) {
      toast.error(err.message || '예약 변경에 실패했습니다.');
    } finally {
      await fetchLaundryData(false);
      setLoadingTimeSlots((prev) => ({ ...prev, [timeIndex]: false }));
    }
  };

  const isTimeSlotReservedByCurrentUser = (timeIndex, isWasher) => {
    if (!laundryData || (!selectedWasher && !selectedDryer) || !currentUser) return false;
    const selectedMachine = isWasher ? selectedWasher : selectedDryer;
    const application = laundryData.applications.find(
      (app) =>
        app.timetable._id === selectedMachine._id && app.student.name === currentUser.name && app.time === timeIndex,
    );
    return !!application;
  };

  return {
    laundryData,
    selectedWasher,
    selectedDryer,
    loading,
    loadingTimeSlots,
    handleTimetableChange,
    handleTimeSelect,
    isTimeSlotReservedByCurrentUser,
    refreshData: fetchLaundryData,
    currentUser,
  };
};
