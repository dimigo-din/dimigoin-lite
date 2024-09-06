'use client';

import Box from '@/components/widgets/Box';
import React, { useState } from 'react';

const TIMES = ['종례 후', '저녁 시간', '야자 1타임 뒤', '야자 2타임 뒤'];

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

export default function FrigoApply() {
  const [reason, setReason] = useState('');
  const [time, setTime] = useState('종례 후');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`사유: ${reason}\n귀가 시간: ${time}`);
  };

  return (
    <Box title="금요귀가 신청" description="금요귀가를 신청해주세요." defaultExpanded={true}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-spacing-550 w-full">
        <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
          <strong className="text-footnote text-content-standard-primary">금요귀가 사유 작성</strong>
          <input
            className="w-full px-spacing-300 py-spacing-400 rounded-radius-300 bg-background-standard-secondary text-content-standard-primary text-footnote"
            placeholder="ex) 학원, 병원"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
            required
          />
          <div className="w-full flex flex-row gap-spacing-100 bg-background-standard-secondary p-spacing-100 rounded-radius-400">
            {TIMES.map((t) => (
              <div
                key={t}
                className={`h-[40px] w-full flex justify-center items-center rounded-radius-300 cursor-pointer ${
                  time === t ? 'bg-components-fill-standard-tertiary' : 'bg-background-standard-secondary'
                }`}
                onClick={() => setTime(t)}
                onKeyDown={() => setTime(t)}>
                {time === t ? (
                  <strong className="text-content-standard-primary text-label">{t}</strong>
                ) : (
                  <span className="text-content-standard-quaternary text-label">{t}</span>
                )}
              </div>
            ))}
          </div>
        </div>
        <Button type="submit" primary>
          금요귀가 신청하기
        </Button>
      </form>
    </Box>
  );
}
