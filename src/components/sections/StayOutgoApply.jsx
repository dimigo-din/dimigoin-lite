'use client';

import Box from '@/components/widgets/Box';
import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const DAYS = [
  { display: '토요일', value: 'saturday' },
  { display: '일요일', value: 'sunday' },
];
const MEALS = [
  { display: '조식', value: 'breakfast' },
  { display: '중식', value: 'lunch' },
  { display: '석식', value: 'dinner' },
];
const DEFAULT_START_TIME = '08:00';
const DEFAULT_END_TIME = '23:00';
const SELF_DEVELOPMENT_SETTINGS = {
  day: 'sunday',
  reason: '자기계발외출',
  startTime: '10:20',
  endTime: '14:00',
  mealCancel: {
    breakfast: false,
    lunch: true,
    dinner: false,
  },
};

const APPLICATION_STATUSES = [
  {
    day: 'saturday',
    reason: '학원',
    startTime: '08:00',
    endTime: '23:00',
    mealCancel: {
      breakfast: true,
      lunch: true,
      dinner: true,
    },
    status: '대기중',
  },
  {
    day: 'sunday',
    reason: '자기계발외출',
    startTime: '10:20',
    endTime: '14:00',
    mealCancel: {
      breakfast: false,
      lunch: true,
      dinner: false,
    },
    status: '승인됨',
  },
  {
    day: 'sunday',
    reason: '놀이동산',
    startTime: '15:00',
    endTime: '23:00',
    mealCancel: {
      breakfast: false,
      lunch: false,
      dinner: true,
    },
    status: '반려됨',
  },
];

const TextLabel = ({ children, className = '' }) => <span className={`text-footnote ${className}`}>{children}</span>;

const TimeSelector = ({ label, value, onChange }) => (
  <div className="flex flex-col justify-start items-start gap-spacing-200">
    <TextLabel className="text-content-standard-tertiary">{label}</TextLabel>
    <input
      type="time"
      value={value}
      onChange={onChange}
      className="w-[120px] px-spacing-300 py-spacing-150 bg-background-standard-secondary border border-line-outline rounded-radius-300 text-content-standard-tertiary text-caption"
    />
  </div>
);

const DaySelector = ({ day, isSelected, onSelect }) => {
  const handleInteraction = () => onSelect(day.value);

  return (
    <div
      className="flex flex-row gap-spacing-100 justify-center items-center cursor-pointer"
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}>
      <MaterialSymbol
        icon="check"
        size={16}
        weight={300}
        className={isSelected ? 'text-core-accent' : 'text-content-standard-quaternary'}
      />
      <TextLabel className={isSelected ? 'text-core-accent font-bold' : 'text-content-standard-quaternary'}>
        {day.display}
      </TextLabel>
    </div>
  );
};

const MealCanceler = ({ meal, isSelected, onSelect }) => {
  const handleInteraction = () => onSelect(meal.value);

  return (
    <div
      className="flex flex-row gap-spacing-100 justify-center items-center cursor-pointer"
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
      role="button"
      tabIndex={0}
      aria-pressed={isSelected}>
      <MaterialSymbol
        icon="check"
        size={16}
        weight={300}
        className={isSelected ? 'text-core-accent' : 'text-content-standard-quaternary'}
      />
      <TextLabel className={isSelected ? 'text-core-accent font-bold' : 'text-content-standard-quaternary'}>
        {meal.display} 취소
      </TextLabel>
    </div>
  );
};

const Button = ({ children, primary, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full flex flex-row justify-center items-center py-spacing-200 rounded-radius-300 ${
      primary ? 'bg-core-accent' : 'bg-background-standard-secondary'
    }`}>
    <strong
      className={`text-footnote ${primary ? 'text-content-inverted-primary' : 'text-content-standard-secondary'}`}>
      {children}
    </strong>
  </button>
);

export default function StayOutgoApply() {
  const [selectedDay, setSelectedDay] = useState(DAYS[0].value);
  const [startTime, setStartTime] = useState(DEFAULT_START_TIME);
  const [endTime, setEndTime] = useState(DEFAULT_END_TIME);
  const [reason, setReason] = useState('');
  const [selectedMeals, setMealCancel] = useState({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `요일: ${selectedDay}\n외출 시작 시간: ${startTime}\n귀교 시간: ${endTime}\n외출 시유: ${reason}\n급식 취소: ${JSON.stringify(selectedMeals)}`,
    );
  };

  const applyPresetSettings = () => {
    setSelectedDay(SELF_DEVELOPMENT_SETTINGS.day);
    setReason(SELF_DEVELOPMENT_SETTINGS.reason);
    setStartTime(SELF_DEVELOPMENT_SETTINGS.startTime);
    setEndTime(SELF_DEVELOPMENT_SETTINGS.endTime);
    setMealCancel(SELF_DEVELOPMENT_SETTINGS.mealCancel);
  };

  const toggleMealCancel = (meal) => {
    setMealCancel((prevMeals) => ({
      ...prevMeals,
      [meal]: !prevMeals[meal],
    }));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case '승인됨':
        return 'bg-solid-translucent-green';
      case '반려됨':
        return 'bg-solid-translucent-red';
      default:
        return 'bg-components-translucent-tertiary';
    }
  };

  const getMealsCancelledText = (mealCancel) => {
    const cancelledMeals = Object.entries(mealCancel)
      .filter(([_, isCancelled]) => isCancelled)
      .map(([meal, _]) => {
        switch (meal) {
          case 'breakfast':
            return '조식';
          case 'lunch':
            return '중식';
          case 'dinner':
            return '석식';
          default:
            return '';
        }
      });
    return cancelledMeals.length > 0 ? `${cancelledMeals.join(', ')} 취소` : '급식 취소 없음';
  };

  const getStatusElement = (status) => {
    switch (status) {
      case '승인됨':
        return <strong className="text-label text-content-standard-primary flex-shrink-0">승인됨</strong>;
      case '반려됨':
        return <strong className="text-label text-content-standard-primary flex-shrink-0">반려됨</strong>;
      default:
        return <span className="text-label text-content-standard-quaternary flex-shrink-0">{status}</span>;
    }
  };

  return (
    <Box title="잔류 중 외출 신청" description="잔류 중 외출을 신청해주세요.">
      <form onSubmit={handleSubmit} className="flex flex-col gap-spacing-550 w-full">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-spacing-550">
          <div className="flex flex-col gap-spacing-200 justify-start items-start">
            <strong className="text-footnote text-content-standard-primary">외출 요일 선택</strong>
            <div className="flex flex-row justify-center items-center gap-spacing-300">
              {DAYS.map((day) => (
                <DaySelector
                  key={day.value}
                  day={day}
                  isSelected={selectedDay === day.value}
                  onSelect={setSelectedDay}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-spacing-200 justify-start items-start">
            <strong className="text-footnote text-content-standard-primary">급식 취소 선택</strong>
            <div className="flex flex-row justify-center items-center gap-spacing-300">
              {MEALS.map((meal) => (
                <MealCanceler
                  key={meal.value}
                  meal={meal}
                  isSelected={selectedMeals[meal.value]}
                  onSelect={() => toggleMealCancel(meal.value)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-spacing-400">
            <TimeSelector label="외출 시작 시각" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <TimeSelector label="귀교 시각" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
          </div>
        </div>
        <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
          <strong className="text-footnote text-content-standard-primary">외출 사유 작성</strong>
          <input
            className="w-full px-spacing-300 py-spacing-400 rounded-radius-300 bg-background-standard-secondary text-content-standard-primary text-footnote"
            placeholder="ex) 학원, 병원"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            required
          />
          <Button onClick={applyPresetSettings}>자기계발외출</Button>
        </div>
        <Button type="submit" primary>
          외출 신청하기
        </Button>
        <div className="w-full flex flex-col gap-spacing-400 justify-start items-start">
          <strong className="text-footnote text-content-standard-primary">신청 현황</strong>
          {APPLICATION_STATUSES.map((application, index) => (
            <div
              key={index}
              className={`flex flex-row px-spacing-500 py-spacing-400 ${getStatusClass(application.status)} gap-spacing-300 w-full rounded-radius-600`}>
              <strong className="text-label text-content-standard-primary flex-shrink-0">
                {application.day === 'saturday' ? '토요일' : '일요일'} 외출
              </strong>
              <span className="w-full text-label text-content-standard-secondary">
                {application.reason} / {getMealsCancelledText(application.mealCancel)} / {application.startTime} ~{' '}
                {application.endTime}
              </span>
              {getStatusElement(application.status)}
            </div>
          ))}
        </div>
      </form>
    </Box>
  );
}
