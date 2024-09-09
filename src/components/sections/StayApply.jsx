'use client';

import Box from '@/components/widgets/Box';
import React, { useState, useCallback, useEffect } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const CURRENT_USER = {
  studentId: '2209',
  name: '김진욱',
};

const RESERVED_SEATS = {
  A1: { studentId: '2201', name: '김민수' },
  A2: { studentId: '2202', name: '박지훈' },
  A3: { studentId: '2203', name: '이승현' },
  A4: { studentId: '2204', name: '김진우' },
  A5: { studentId: '2205', name: '이승민' },
};

const AVAILABLE_SEATS = [
  'A1',
  'A2',
  'A3',
  'A4',
  'A5',
  'A6',
  'A7',
  'A8',
  'A9',
  'A10',
  'A11',
  'A12',
  'A13',
  'A14',
  'A15',
  'A16',
  'A17',
  'A18',
  'B1',
  'B2',
  'B3',
  'B4',
  'B5',
  'B6',
  'B7',
  'B8',
  'B9',
  'B10',
  'B11',
  'B12',
  'B13',
  'B14',
  'B15',
  'B16',
  'B17',
  'B18',
  'C1',
  'C2',
  'C3',
  'C4',
  'C5',
  'C6',
  'C7',
  'C8',
  'C9',
  'C10',
  'C11',
  'C12',
  'C13',
  'C14',
  'C15',
  'C16',
  'C17',
  'C18',
  'D1',
  'D2',
  'D3',
  'D4',
  'D5',
  'D6',
  'D7',
  'D8',
  'D9',
  'D10',
  'D11',
  'D12',
  'D13',
  'D14',
  'D15',
  'D16',
  'D17',
  'D18',
  'E1',
  'E2',
  'E3',
  'E4',
  'E5',
  'E6',
  'E7',
  'E8',
  'E9',
  'E10',
  'E11',
  'E12',
  'E13',
  'E14',
  'E15',
  'E16',
  'E17',
  'E18',
];

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

      if (AVAILABLE_SEATS.includes(coordinate)) {
        return <Seat type="available" coordinate={coordinate} onClick={onSeatSelect} />;
      }

      return <Seat type="unavailable" coordinate={coordinate} onClick={onSeatSelect} />;
    },
    [selectedSeat, onSeatSelect],
  );

  return (
    <div className="flex flex-col gap-spacing-150">
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
          {rows.slice(1).map((row) => (
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
    className={`w-full flex flex-row justify-center items-center py-spacing-200 rounded-radius-200 ${
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

const TextInput = ({ value, onChange, placeholder, disabled, required }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    required={required}
    className="w-full px-spacing-400 py-spacing-300 bg-background-standard-secondary rounded-radius-200 text-footnote text-content-standard-primary placeholder:text-content-standard-tertiary disabled:bg-background-standard-tertiary disabled:text-content-standard-tertiary disabled:cursor-not-allowed"
  />
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="h-full md:h-auto md:m-spacing-200 flex flex-col gap-spacing-300 bg-background-standard-primary p-spacing-550 rounded-radius-300 overflow-auto">
        <div className="flex justify-between items-center">
          <strong className="text-heading text-content-standard-primary">좌석 배치도</strong>
          <button type="button" onClick={onClose} className="text-content-standard-primary">
            <MaterialSymbol weight={300} icon="close" size={24} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default function StayApply() {
  const [selectedSeat, setSelectedSeat] = useState('NONE');
  const [unselectedReason, setUnselectedReason] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSeatSelect = useCallback((coordinate) => {
    setSelectedSeat((prevSeat) => (prevSeat === coordinate ? 'NONE' : coordinate));
  }, []);

  const handleUnselectedReasonChange = (e) => {
    setUnselectedReason(e.target.value);
  };

  useEffect(() => {
    if (selectedSeat !== 'NONE') {
      setUnselectedReason('');
    }
  }, [selectedSeat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `신청된 좌석: ${selectedSeat}\n미선택 사유: ${unselectedReason}\n학번: ${CURRENT_USER.studentId}\n이름: ${CURRENT_USER.name}`,
    );
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Box title="잔류 신청" description="원하시는 잔류 좌석을 선택해주세요.">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row justify-start items-start w-full gap-spacing-700">
        <div className="w-full flex flex-col justify-end items-end gap-spacing-200">
          <div className="w-full h-[200px] md:h-[400px] md:w-[500px] overflow-auto flex-shrink-0">
            <Seats selectedSeat={selectedSeat} onSeatSelect={handleSeatSelect} />
          </div>
          <div
            className="flex flex-row gap-spacing-100 justify-center items-center cursor-pointer"
            onClick={openModal}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && openModal()}>
            <MaterialSymbol icon="fullscreen" size={16} weight={300} className="text-content-standard-tertiary" />
            <strong className="text-label text-content-standard-tertiary">크게 보기</strong>
          </div>
        </div>
        <div className="md:h-[430px] w-full flex flex-col justify-between items-start gap-spacing-700">
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
              <strong className="text-label text-core-accent">
                {selectedSeat === 'NONE' ? '미선택' : selectedSeat}
              </strong>
            </div>
            <TextInput
              value={unselectedReason}
              onChange={handleUnselectedReasonChange}
              placeholder="미선택 사유를 입력해주세요"
              disabled={selectedSeat !== 'NONE'}
              required={selectedSeat === 'NONE'}
            />
            <Button type="submit" primary>
              <span className="text-center w-full">잔류 신청하기</span>
            </Button>
          </div>
        </div>
      </form>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full h-full overflow-auto">
          <Seats selectedSeat={selectedSeat} onSeatSelect={handleSeatSelect} />
        </div>
      </Modal>
    </Box>
  );
}
