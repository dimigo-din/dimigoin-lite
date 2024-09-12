'use client';

import Box from '@/components/widgets/Box';
import { useFrigoApplication } from '@/hooks/useFrigoApplication';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

const TIMES = ['종례 후', '저녁 시간', '야자 1타임 뒤', '야자 2타임 뒤'];

const SkeletonButton = () => (
  <div className="w-full h-[36px] bg-background-standard-secondary rounded-radius-300 animate-pulse" />
);

const SkeletonTextInput = () => (
  <div className="w-full h-[52px] bg-background-standard-secondary rounded-radius-300 animate-pulse" />
);

const SkeletonTimeOptions = () => (
  <div className="w-full h-[48px] flex flex-row gap-spacing-100 bg-background-standard-secondary animate-pulse p-spacing-100 rounded-radius-400" />
);

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

const TimeOption = ({ t, isSelected, onClick, disabled }) => {
  const getDisplayText = (text) => {
    if (text === '야자 1타임 뒤')
      return (
        <>
          <span className="md:hidden">야자1 뒤</span>
          <span className="hidden md:inline">야자 1타임 뒤</span>
        </>
      );
    if (text === '야자 2타임 뒤')
      return (
        <>
          <span className="md:hidden">야자2 뒤</span>
          <span className="hidden md:inline">야자 2타임 뒤</span>
        </>
      );
    return text;
  };

  return (
    <div
      className={`h-[40px] w-full flex justify-center items-center rounded-radius-300 cursor-pointer ${
        isSelected ? 'bg-components-fill-standard-tertiary' : 'bg-transparent'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={disabled ? null : onClick}
      onKeyDown={disabled ? null : onClick}>
      {isSelected ? (
        <strong className="text-content-standard-primary text-label text-center">{getDisplayText(t)}</strong>
      ) : (
        <span className="text-content-standard-quaternary text-label text-center">{getDisplayText(t)}</span>
      )}
    </div>
  );
};

export default function FrigoApply({ refreshMyStatus }) {
  const { frigoData, loading, reason, setReason, time, setTime, handleApply, handleCancel } =
    useFrigoApplication(refreshMyStatus);

  const isApplied = frigoData !== null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isApplied) {
      handleCancel();
    } else {
      handleApply();
    }
  };

  return (
    <>
      <Box title="금요귀가 신청" description="금요귀가를 신청해주세요.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-spacing-550 w-full">
          <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
            <strong className="text-footnote text-content-standard-primary">금요귀가 사유 작성</strong>
            {loading ? (
              <SkeletonTextInput />
            ) : (
              <input
                className="w-full px-spacing-300 py-spacing-400 rounded-radius-300 bg-background-standard-secondary text-content-standard-primary text-footnote"
                placeholder="ex) 학원, 병원"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                disabled={isApplied}
              />
            )}
            {loading ? (
              <SkeletonTimeOptions />
            ) : (
              <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
                {TIMES.map((t) => (
                  <TimeOption key={t} t={t} isSelected={time === t} onClick={() => setTime(t)} disabled={isApplied} />
                ))}
              </div>
            )}
          </div>
          {loading ? (
            <SkeletonButton />
          ) : (
            <Button type="submit" primary>
              {isApplied ? '금요귀가 신청 취소하기' : '금요귀가 신청하기'}
            </Button>
          )}
        </form>
      </Box>
    </>
  );
}
