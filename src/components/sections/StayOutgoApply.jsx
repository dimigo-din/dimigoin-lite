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
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      setErrorMessage('외출 사유를 입력해주세요.');
      return;
    }
    setErrorMessage('');
    alert(selectedDay);
    alert(startTime);
    alert(endTime);
    alert(reason);
    alert(JSON.stringify(selectedMeals));
  };

  const applyPresetSettings = () => {
    setSelectedDay(SELF_DEVELOPMENT_SETTINGS.day);
    setReason(SELF_DEVELOPMENT_SETTINGS.reason);
    setStartTime(SELF_DEVELOPMENT_SETTINGS.startTime);
    setEndTime(SELF_DEVELOPMENT_SETTINGS.endTime);
    setMealCancel(SELF_DEVELOPMENT_SETTINGS.mealCancel);
    setErrorMessage('');
  };

  const toggleMealCancel = (meal) => {
    setMealCancel((prevMeals) => ({
      ...prevMeals,
      [meal]: !prevMeals[meal],
    }));
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
            className="w-full px-spacing-300 py-spacing-400 rounded-radius-300 bg-background-standard-secondary text-content-standard-primary text-caption"
            placeholder="ex) 학원, 병원"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
              setErrorMessage('');
            }}
            required
          />
          {errorMessage && <TextLabel className="text-error">{errorMessage}</TextLabel>}
          <Button onClick={applyPresetSettings}>자기계발외출</Button>
        </div>
        <Button type="submit" primary>
          외출 신청하기
        </Button>
      </form>
    </Box>
  );
}
