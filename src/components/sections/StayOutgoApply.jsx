'use client';

import Box from '@/components/widgets/Box';
import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

// Constants
const DAYS = ['토요일', '일요일'];
const DEFAULT_START_TIME = '08:00';
const DEFAULT_END_TIME = '23:00';
const SELF_DEVELOPMENT_SETTINGS = {
  day: '일요일',
  reason: '자기계발외출',
  startTime: '10:20',
  endTime: '14:00',
};

/**
 * @typedef {Object} TextLabelProps
 * @property {React.ReactNode} children
 * @property {string} [className]
 */

/**
 * @param {TextLabelProps} props
 * @returns {JSX.Element}
 */
const TextLabel = ({ children, className = '' }) => <span className={`text-footnote ${className}`}>{children}</span>;

/**
 * @typedef {Object} TimeSelectorProps
 * @property {string} label
 * @property {string} value
 * @property {(event: React.ChangeEvent<HTMLInputElement>) => void} onChange
 */

/**
 * @param {TimeSelectorProps} props
 * @returns {JSX.Element}
 */
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

/**
 * @typedef {Object} DaySelectorProps
 * @property {string} day
 * @property {boolean} isSelected
 * @property {(day: string) => void} onSelect
 */

/**
 * @param {DaySelectorProps} props
 * @returns {JSX.Element}
 */
const DaySelector = ({ day, isSelected, onSelect }) => {
  const handleInteraction = () => onSelect(day);

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
        {day}
      </TextLabel>
    </div>
  );
};

/**
 * @typedef {Object} ButtonProps
 * @property {React.ReactNode} children
 * @property {boolean} [primary]
 * @property {() => void} onClick
 * @property {('button'|'submit'|'reset')} [type]
 */

/**
 * @param {ButtonProps} props
 * @returns {JSX.Element}
 */
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

/**
 * StayOutgoApply Component
 * @returns {JSX.Element}
 */
export default function StayOutgoApply() {
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [startTime, setStartTime] = useState(DEFAULT_START_TIME);
  const [endTime, setEndTime] = useState(DEFAULT_END_TIME);
  const [reason, setReason] = useState('');

  /**
   * @param {React.FormEvent<HTMLFormElement>} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', { selectedDay, startTime, endTime, reason });
  };

  const applyPresetSettings = () => {
    setSelectedDay(SELF_DEVELOPMENT_SETTINGS.day);
    setReason(SELF_DEVELOPMENT_SETTINGS.reason);
    setStartTime(SELF_DEVELOPMENT_SETTINGS.startTime);
    setEndTime(SELF_DEVELOPMENT_SETTINGS.endTime);
  };

  return (
    <Box>
      <div className="flex flex-col justify-start items-start gap-spacing-100">
        <strong className="text-label text-content-standard-primary">잔류 외출 신청</strong>
        <TextLabel className="text-content-standard-tertiary">잔류 중 외출을 신청해주세요.</TextLabel>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-start items-start px-spacing-700 py-spacing-550 gap-spacing-550">
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-spacing-550">
          <div className="flex flex-col gap-spacing-200 justify-start items-start">
            <strong className="text-footnote text-content-standard-primary">외출 요일 선택</strong>
            <div className="flex flex-row justify-center items-center gap-spacing-300">
              {DAYS.map((day) => (
                <DaySelector key={day} day={day} isSelected={selectedDay === day} onSelect={setSelectedDay} />
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
            onChange={(e) => setReason(e.target.value)}
          />
          <Button onClick={applyPresetSettings}>자기계발외출</Button>
        </div>
        <Button type="submit" primary>
          외출 신청하기
        </Button>
      </form>
    </Box>
  );
}
