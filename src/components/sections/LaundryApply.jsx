'use client';

import Box from '@/components/widgets/Box';
import { useLaundryData } from '@/hooks/useLaundryData';
import React from 'react';

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
    <div className="w-full h-[48px] bg-background-standard-secondary rounded-radius-400" />
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
    selectedTimetable,
    loading,
    loadingTimeSlots,
    handleTimetableChange,
    handleTimeSelect,
    currentUser,
  } = useLaundryData();

  const handleTimeSelectAndRefresh = async (index) => {
    await handleTimeSelect(index);
    refreshMyStatus();
  };

  const renderContent = () => {
    if (loading) {
      return <SkeletonLoader />;
    }

    if (!laundryData || !selectedTimetable) {
      return <div className="flex justify-center items-center h-40">데이터를 불러올 수 없습니다.</div>;
    }

    return (
      <>
        <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            {laundryData.timetables.map((timetable) => (
              <OptionButton
                key={timetable._id}
                text={`${timetable.laundry.floor}층 ${timetable.laundry.position}`}
                isSelected={selectedTimetable._id === timetable._id}
                onClick={() => handleTimetableChange(timetable)}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-spacing-300">
          {selectedTimetable.sequence.map((time, index) => {
            const application = laundryData.applications.find(
              (app) => app.timetable._id === selectedTimetable._id && app.time === index,
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
