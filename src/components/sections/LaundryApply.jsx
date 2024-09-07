'use client';

import Box from '@/components/widgets/Box';
import React, { useState } from 'react';

const CURRENT_USER = {
  studentId: '2209',
  name: '김진욱',
};

const INITIAL_LAUNDRY_DATA = {
  세탁기: {
    '2층': {
      좌측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'reserved', user: '3209 박경배' },
        { time: '8시 30분', status: 'available' },
      ],
      중앙: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'reserved', user: '3210 이민준' },
      ],
      우측: [
        { time: '6시 30분', status: 'reserved', user: '3211 정서연' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
    },
    '4층': {
      좌측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
      중앙: [
        { time: '6시 30분', status: 'reserved', user: '3212 김하은' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
      우측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'reserved', user: '3213 최준호' },
        { time: '8시 30분', status: 'available' },
      ],
    },
  },
  건조기: {
    '4층': {
      좌측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'reserved', user: '3214 장서윤' },
      ],
      중앙: [
        { time: '6시 30분', status: 'reserved', user: '3215 임지훈' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
      우측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
    },
    '5층': {
      좌측: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'reserved', user: '3216 송민서' },
        { time: '8시 30분', status: 'available' },
      ],
      중앙: [
        { time: '6시 30분', status: 'available' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
      우측: [
        { time: '6시 30분', status: 'reserved', user: '3217 홍지영' },
        { time: '7시 30분', status: 'available' },
        { time: '8시 30분', status: 'available' },
      ],
    },
  },
};

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

const LaundryTimeItem = ({ time, status, user, onSelect, index }) => {
  let buttonClass =
    'w-full flex flex-row items-center px-spacing-500 py-spacing-300 rounded-radius-300 gap-spacing-300 border ';
  let textClass = '';

  switch (status) {
    case 'available':
      buttonClass += 'bg-background-standard-primary border-line-outline cursor-pointer';
      textClass = 'text-content-standard-secondary';
      break;
    case 'reserved':
      if (user === `${CURRENT_USER.studentId} ${CURRENT_USER.name}`) {
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
      className={buttonClass}
      onClick={onSelect}
      disabled={status === 'reserved' && user !== `${CURRENT_USER.studentId} ${CURRENT_USER.name}`}>
      <span className={`text-footnote ${textClass} flex-shrink-0`}>{`${index + 1}타임`}</span>
      <strong className={`${textClass} text-label w-full text-left`}>
        {status === 'available' ? '예약 가능' : user}
      </strong>
      <span className={`text-footnote ${textClass} flex-shrink-0`}>{time}</span>
    </button>
  );
};

export default function LaundryApply() {
  const [laundryData, setLaundryData] = useState(INITIAL_LAUNDRY_DATA);
  const [machine, setMachine] = useState('세탁기');
  const [floor, setFloor] = useState('2층');
  const [direction, setDirection] = useState('좌측');

  const handleMachineChange = (newMachine) => {
    setMachine(newMachine);
    setFloor(Object.keys(laundryData[newMachine])[0]);
    setDirection('좌측');
  };

  const handleFloorChange = (newFloor) => {
    setFloor(newFloor);
    setDirection('좌측');
  };

  const handleDirectionChange = (newDirection) => {
    setDirection(newDirection);
  };

  const handleTimeSelect = (selectedTime) => {
    setLaundryData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const currentSlot = newData[machine][floor][direction].find((slot) => slot.time === selectedTime);

      let userReservation = null;
      for (const m in newData) {
        for (const f in newData[m]) {
          for (const d in newData[m][f]) {
            const reserved = newData[m][f][d].find(
              (slot) => slot.status === 'reserved' && slot.user === `${CURRENT_USER.studentId} ${CURRENT_USER.name}`,
            );
            if (reserved) {
              userReservation = { machine: m, floor: f, direction: d, slot: reserved };
              break;
            }
          }
          if (userReservation) break;
        }
        if (userReservation) break;
      }

      if (currentSlot.status === 'available') {
        if (userReservation) {
          userReservation.slot.status = 'available';
          userReservation.slot.user = undefined;
        }
        currentSlot.status = 'reserved';
        currentSlot.user = `${CURRENT_USER.studentId} ${CURRENT_USER.name}`;
      } else if (
        currentSlot.status === 'reserved' &&
        currentSlot.user === `${CURRENT_USER.studentId} ${CURRENT_USER.name}`
      ) {
        currentSlot.status = 'available';
        currentSlot.user = undefined;
      }

      return newData;
    });
  };

  return (
    <Box title="세탁 신청" description="세탁기 및 건조기를 신청해주세요.">
      <div className="flex flex-col gap-spacing-400 w-full">
        <div className="w-full flex flex-col gap-spacing-200 justify-start items-start">
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            {Object.keys(laundryData).map((m) => (
              <OptionButton key={m} text={m} isSelected={machine === m} onClick={() => handleMachineChange(m)} />
            ))}
          </div>
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            {Object.keys(laundryData[machine]).map((f) => (
              <OptionButton key={f} text={f} isSelected={floor === f} onClick={() => handleFloorChange(f)} />
            ))}
          </div>
          <div className="w-full flex flex-row gap-spacing-100 bg-components-translucent-secondary p-spacing-100 rounded-radius-400">
            {Object.keys(laundryData[machine][floor]).map((d) => (
              <OptionButton key={d} text={d} isSelected={direction === d} onClick={() => handleDirectionChange(d)} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-spacing-300">
          {laundryData[machine][floor][direction].map((slot, index) => (
            <LaundryTimeItem
              key={index}
              time={slot.time}
              status={slot.status}
              user={slot.user}
              onSelect={() => handleTimeSelect(slot.time)}
              index={index}
            />
          ))}
        </div>
      </div>
    </Box>
  );
}
