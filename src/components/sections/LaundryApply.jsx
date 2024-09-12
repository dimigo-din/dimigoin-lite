'use client';

import Box from '@/components/widgets/Box';
import { useLaundryData } from '@/hooks/useLaundryData';
import React, { useState, useMemo, useCallback } from 'react';

const OptionButton = ({ text, isSelected, onClick }) => {
  return (
    <div
      className={`h-[40px] w-full flex justify-center items-center rounded-radius-300 cursor-pointer ${
        isSelected ? 'bg-components-fill-standard-tertiary' : 'bg-transparent'
      }`}
      onClick={onClick}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}>
      {isSelected ? (
        <strong className="text-content-standard-primary text-label text-center">{text}</strong>
      ) : (
        <span className="text-content-standard-quaternary text-label text-center">{text}</span>
      )}
    </div>
  );
};

const LaundryTimeItem = ({ time, status, user, onSelect, index, isLoading, currentUser }) => {
  let buttonClass =
    'w-full flex flex-row items-center px-spacing-500 py-spacing-300 rounded-radius-300 gap-spacing-300 border ';
  let textClass = '';

  switch (status) {
    case 'available':
      buttonClass += 'bg-background-standard-primary border-line-outline cursor-pointer';
      textClass = 'text-content-standard-secondary';
      break;
    case 'reserved':
      if (user === `${currentUser.studentId} ${currentUser.name}`) {
        buttonClass += 'bg-core-accent border-core-accent cursor-pointer';
        textClass = 'text-content-inverted-primary';
      } else {
        buttonClass += 'bg-background-standard-secondary border-line-outline cursor-not-allowed';
        textClass = 'text-content-standard-secondary';
      }
      break;
  }

  return (
    <button
      type="button"
      className={`${buttonClass} ${isLoading ? 'opacity-50' : ''}`}
      onClick={() => onSelect(index)}
      disabled={isLoading || (status === 'reserved' && user !== `${currentUser.studentId} ${currentUser.name}`)}>
      <span className={`text-footnote ${textClass} flex-shrink-0`}>{`${index + 1}타임`}</span>
      <strong className={`${textClass} text-label w-full text-left`}>
        {isLoading ? '로딩 중...' : status === 'available' ? '예약 가능' : user}
      </strong>
      <span className={`text-footnote ${textClass} flex-shrink-0`}>{time}</span>
    </button>
  );
};

const SkeletonLoader = () => (
  <div className="flex flex-col gap-spacing-400 w-full animate-pulse">
    <div className="flex flex-col gap-spacing-200">
      <div className="w-full h-[48px] bg-background-standard-secondary rounded-radius-400" />
      <div className="w-full h-[48px] bg-background-standard-secondary rounded-radius-400" />
    </div>
    <div className="flex flex-col gap-spacing-300">
      {[...Array(5)].map((_, index) => (
        <div key={index} className="w-full h-[48px] bg-background-standard-secondary rounded-radius-300" />
      ))}
    </div>
  </div>
);

export default function LaundryApply({ refreshMyStatus }) {
  const {
    laundryData,
    selectedWasher,
    selectedDryer,
    loading,
    loadingTimeSlots,
    handleTimetableChange,
    handleTimeSelect,
    currentUser,
  } = useLaundryData();

  const [selectedMachineType, setSelectedMachineType] = useState('세탁기');

  const handleTimeSelectAndRefresh = async (index) => {
    await handleTimeSelect(index, selectedMachineType === '세탁기');
    refreshMyStatus();
  };

  const getMachineType = useCallback((floor) => {
    const floorNumber = Number.parseInt(floor);
    return floorNumber >= 10 ? '건조기' : '세탁기';
  }, []);

  const getDisplayFloor = useCallback((floor) => {
    const floorNumber = Number.parseInt(floor);
    return floorNumber >= 10 ? `${floorNumber - 10}` : floor;
  }, []);

  const filteredTimetables = useMemo(() => {
    return (
      laundryData?.timetables.filter((timetable) => getMachineType(timetable.laundry.floor) === selectedMachineType) ||
      []
    );
  }, [laundryData, selectedMachineType, getMachineType]);

  const selectedMachine = selectedMachineType === '세탁기' ? selectedWasher : selectedDryer;

  const renderContent = () => {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (!laundryData || !selectedMachine) {
      return <div className="flex justify-center items-center h-40">데이터를 불러올 수 없습니다.</div>;
    }

    return (
      <>
        <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            <OptionButton
              text="세탁기"
              isSelected={selectedMachineType === '세탁기'}
              onClick={() => setSelectedMachineType('세탁기')}
            />
            <OptionButton
              text="건조기"
              isSelected={selectedMachineType === '건조기'}
              onClick={() => setSelectedMachineType('건조기')}
            />
          </div>
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            {filteredTimetables.map((timetable) => (
              <OptionButton
                key={timetable._id}
                text={`${getDisplayFloor(timetable.laundry.floor)}층 ${timetable.laundry.position}`}
                isSelected={selectedMachine._id === timetable._id}
                onClick={() => handleTimetableChange(timetable, selectedMachineType === '세탁기')}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-spacing-300">
          {selectedMachine.sequence.map((time, index) => {
            const application = laundryData.applications.find(
              (app) => app.timetable._id === selectedMachine._id && app.time === index,
            );
            return (
              <LaundryTimeItem
                key={index}
                time={time}
                status={application ? 'reserved' : 'available'}
                user={
                  application
                    ? `${application.student.grade}${application.student.class}${application.student.number.toString().padStart(2, '0')} ${application.student.name}`
                    : undefined
                }
                onSelect={() => handleTimeSelectAndRefresh(index)}
                index={index}
                isLoading={loadingTimeSlots[index]}
                currentUser={currentUser}
              />
            );
          })}
        </div>
      </>
    );
  };

  return (
    <Box title="세탁 신청" description="세탁기 및 건조기를 신청해주세요.">
      <div className="flex flex-col gap-spacing-400 w-full">{renderContent()}</div>
    </Box>
  );
}
