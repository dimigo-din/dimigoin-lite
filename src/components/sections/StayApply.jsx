'use client';

import Box from '@/components/widgets/Box';
import React, { useState, useCallback } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const CURRENT_USER = {
  studentId: '2024',
  name: '김코딩',
};

const RESERVED_SEATS = {
  A1: { studentId: '2001', name: '김예약' },
  B3: { studentId: '2002', name: '이예약' },
  C5: { studentId: '2003', name: '박예약' },
  D7: { studentId: '2004', name: '최예약' },
  E9: { studentId: '2005', name: '정예약' },
  F11: { studentId: '2006', name: '강예약' },
  G13: { studentId: '2007', name: '조예약' },
  H15: { studentId: '2008', name: '윤예약' },
  I17: { studentId: '2009', name: '장예약' },
  J2: { studentId: '2010', name: '임예약' },
  K4: { studentId: '2011', name: '한예약' },
  L6: { studentId: '2012', name: '오예약' },
  M8: { studentId: '2013', name: '서예약' },
  N10: { studentId: '2014', name: '신예약' },
  O12: { studentId: '2015', name: '권예약' },
};

const TextLabel = ({ children, className = '' }) => <span className={`text-footnote ${className}`}>{children}</span>;

const GuideText = ({ text }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 flex justify-center items-center">
    <span className="text-caption text-center text-content-standard-primary">{text}</span>
  </div>
);

const Seat = ({ type, studentId, name, coordinate, onClick }) => {
  const baseClasses = 'w-[40px] h-[30px] rounded-radius-100 flex justify-center items-center';
  const contentClasses = 'text-[10px] leading-[10px] text-center';

  const seatTypes = {
    reserved: `${baseClasses} bg-core-accent-translucent cursor-not-allowed`,
    selected: `${baseClasses} bg-core-accent cursor-pointer`,
    available: `${baseClasses} bg-background-standard-secondary border border-core-accent-secondary cursor-pointer`,
    unavailable: `${baseClasses} bg-components-translucent-secondary cursor-not-allowed`,
  };

  const handleInteraction = () => {
    if (type === 'available' || type === 'selected') {
      onClick(coordinate);
    }
  };

  return (
    <div
      className={seatTypes[type]}
      onClick={handleInteraction}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleInteraction();
        }
      }}
      role={type === 'available' || type === 'selected' ? 'button' : 'presentation'}
      tabIndex={type === 'available' || type === 'selected' ? 0 : -1}
      aria-pressed={type === 'selected'}>
      {type === 'available' ? (
        <span className={`${contentClasses} text-content-standard-tertiary`}>{coordinate}</span>
      ) : type !== 'unavailable' ? (
        <span
          className={`${contentClasses} ${type === 'selected' ? 'text-content-inverted-primary' : 'text-content-standard-primary'}`}>
          {studentId}
          <br />
          {name}
        </span>
      ) : null}
    </div>
  );
};

const SeatPair = ({ row, col, selectedSeat, onSeatSelect }) => {
  const generateSeat = useCallback(
    (seatRow, seatCol) => {
      const coordinate = `${seatRow}${seatCol}`;
      if (selectedSeat === coordinate) {
        return (
          <Seat
            type="selected"
            studentId={CURRENT_USER.studentId}
            name={CURRENT_USER.name}
            coordinate={coordinate}
            onClick={onSeatSelect}
          />
        );
      }

      if (RESERVED_SEATS[coordinate]) {
        return (
          <Seat
            type="reserved"
            studentId={RESERVED_SEATS[coordinate].studentId}
            name={RESERVED_SEATS[coordinate].name}
            coordinate={coordinate}
            onClick={onSeatSelect}
          />
        );
      }

      return <Seat type="available" coordinate={coordinate} onClick={onSeatSelect} />;
    },
    [selectedSeat, onSeatSelect],
  );

  return (
    <div className="flex flex-col gap-spacing-100">
      {generateSeat(row, col)}
      {generateSeat(String.fromCharCode(row.charCodeAt(0) + 1), col)}
    </div>
  );
};

const Seats = ({ selectedSeat, onSeatSelect }) => {
  const rows = ['A', 'C', 'E', 'G', 'I', 'K', 'M'];
  const leftCols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const rightCols = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];

  return (
    <div className="flex flex-row justify-start items-start gap-spacing-800">
      <div className="flex flex-row gap-spacing-150">
        <div className="flex flex-col gap-spacing-500">
          <div className="flex flex-col gap-spacing-150">
            <GuideText text="#" />
            <GuideText text="A" />
            <GuideText text="B" />
          </div>
          {rows.slice(1).map((row, index) => (
            <div key={row} className="flex flex-col gap-spacing-150">
              <GuideText text={row} />
              <GuideText text={String.fromCharCode(row.charCodeAt(0) + 1)} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-spacing-500">
          <div className="flex flex-col gap-spacing-150">
            <div className="flex flex-row gap-spacing-150">
              {leftCols.map((col) => (
                <GuideText key={col} text={col} />
              ))}
            </div>
            <div className="flex flex-row gap-spacing-150">
              {leftCols.map((col) => (
                <SeatPair key={col} row="A" col={col} selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} />
              ))}
            </div>
          </div>
          {rows.slice(1).map((row) => (
            <div key={row} className="flex flex-col gap-spacing-150">
              <div className="flex flex-row gap-spacing-150">
                {leftCols.map((col) => (
                  <SeatPair key={col} row={row} col={col} selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-spacing-500">
        <div className="flex flex-col gap-spacing-150">
          <div className="flex flex-row gap-spacing-150">
            {rightCols.map((col) => (
              <GuideText key={col} text={col} />
            ))}
          </div>
          <div className="flex flex-row gap-spacing-150">
            {rightCols.map((col) => (
              <SeatPair key={col} row="A" col={col} selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} />
            ))}
          </div>
        </div>
        {rows.slice(1).map((row) => (
          <div key={row} className="flex flex-col gap-spacing-150">
            <div className="flex flex-row gap-spacing-150">
              {rightCols.map((col) => (
                <SeatPair key={col} row={row} col={col} selectedSeat={selectedSeat} onSeatSelect={onSeatSelect} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Button = ({ children, primary, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full flex flex-row justify-center items-center px-spacing-400 py-spacing-300 rounded-radius-200 ${
      primary ? 'bg-core-accent' : 'bg-background-standard-secondary'
    }`}>
    <strong
      className={`text-footnote ${primary ? 'text-content-inverted-primary' : 'text-content-standard-secondary'}`}>
      {children}
    </strong>
  </button>
);

const LegendItem = ({ color, text }) => (
  <div className="flex flex-row justify-start items-center gap-spacing-200">
    <div className={`w-[20px] h-[15px] rounded-radius-100 ${color}`} />
    <span className="text-caption text-content-standard-primary">{text}</span>
  </div>
);

const TextInput = ({ value, onChange, placeholder, disabled }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className="w-full px-spacing-400 py-spacing-300 bg-background-standard-secondary rounded-radius-200 text-footnote text-content-standard-primary placeholder:text-content-standard-tertiary disabled:bg-background-standard-tertiary disabled:text-content-standard-tertiary disabled:cursor-not-allowed"
  />
);

export default function StayApply() {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [unselectedReason, setUnselectedReason] = useState('');

  const handleSeatSelect = useCallback((coordinate) => {
    setSelectedSeat((prevSeat) => (prevSeat === coordinate ? null : coordinate));
  }, []);

  const handleUnselectedReasonChange = (e) => {
    setUnselectedReason(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSeat && !unselectedReason.trim()) {
      return;
    }
    if (selectedSeat) {
      alert(`신청된 좌석: ${selectedSeat}\n학번: ${CURRENT_USER.studentId}\n이름: ${CURRENT_USER.name}`);
    } else {
      alert(`미선택 사유: ${unselectedReason}\n학번: ${CURRENT_USER.studentId}\n이름: ${CURRENT_USER.name}`);
    }
  };

  return (
    <Box title="잔류 신청" description="원하시는 잔류 좌석을 선택해주세요.">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-start items-start w-full gap-spacing-700">
        <div className="w-full h-[200px] md:h-[400px] md:w-[500px] overflow-auto flex-shrink-0">
          <Seats selectedSeat={selectedSeat} onSeatSelect={handleSeatSelect} />
        </div>
        <div className="md:h-[400px] w-full flex flex-col justify-between items-start gap-spacing-700">
          <div className="w-full flex flex-row flex-wrap md:flex-col justify-start items-start gap-spacing-200">
            <LegendItem color="bg-core-accent-translucent" text="이미 신청된 자리" />
            <LegendItem color="bg-core-accent" text="현재 선택한 자리" />
            <LegendItem
              color="bg-background-standard-secondary border border-core-accent-secondary"
              text="선택 가능한 자리"
            />
            <LegendItem color="bg-components-translucent-secondary" text="선택 불가한 자리" />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-spacing-200">
            <strong className="text-label">좌석 선택</strong>
            <div className="w-full flex flex-row justify-start items-center gap-spacing-200">
              <span className="text-footnote text-content-standard-tertiary">내가 선택한 좌석</span>
              <strong className="text-label text-core-accent">{selectedSeat || '미선택'}</strong>
            </div>
            <TextInput
              value={unselectedReason}
              onChange={handleUnselectedReasonChange}
              placeholder="미선택 사유를 입력해주세요"
              disabled={!!selectedSeat}
            />
            <Button type="submit" primary>
              <span className="text-center w-full">잔류 신청하기</span>
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
}
