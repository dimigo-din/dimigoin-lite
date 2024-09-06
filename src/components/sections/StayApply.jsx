import Box from '@/components/widgets/box';
import { Span } from 'next/dist/server/lib/trace/tracer';
import React from 'react';

const GuideText = ({ text }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 flex justify-center items-center">
    <span className="text-caption text-center text-content-standard-primary">{text}</span>
  </div>
);

const ReservedSeat = ({ studentId, name }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 bg-core-accent-translucent flex justify-center items-center">
    <span className="text-[10px] leading-[10px] text-center text-content-standard-primary">
      {studentId}
      <br />
      {name}
    </span>
  </div>
);

const SelectedSeat = ({ studentId, name }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 bg-core-accent flex justify-center items-center">
    <span className="text-[10px] leading-[10px] text-center text-content-inverted-primary">
      {studentId}
      <br />
      {name}
    </span>
  </div>
);

const AvailableSeat = ({ coordinate }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 bg-background-standard-secondary border border-core-accent-translucent flex justify-center items-center">
    <span className="text-[10px] leading-[10px] text-center text-content-standard-tertiary">{coordinate}</span>
  </div>
);

const UnavailableSeat = () => (
  <div className="w-[40px] h-[30px] rounded-radius-100 bg-components-translucent-secondary" />
);

const generateRandomSeat = (row, col) => {
  const types = ['reserved', 'available', 'available', 'available'];
  const type = types[Math.floor(Math.random() * types.length)];
  const studentId = Math.floor(1000 + Math.random() * 9000).toString();
  const name =
    ['김', '이', '박', '최', '정'][Math.floor(Math.random() * 5)] +
    ['준', '민', '서', '지', '현'][Math.floor(Math.random() * 5)] +
    ['준', '민', '서', '지', '현'][Math.floor(Math.random() * 5)];
  const coordinate = `${row}${col}`;

  switch (type) {
    case 'reserved':
      return <ReservedSeat studentId={studentId} name={name} />;
    case 'selected':
      return <SelectedSeat studentId={studentId} name={name} />;
    case 'available':
      return <AvailableSeat coordinate={coordinate} />;
    case 'unavailable':
      return <UnavailableSeat />;
    default:
      return null;
  }
};

const SeatPair = ({ row, col }) => (
  <div className="flex flex-col gap-spacing-100">
    {generateRandomSeat(row, col)}
    {generateRandomSeat(String.fromCharCode(row.charCodeAt(0) + 1), col)}
  </div>
);

const Seats = () => {
  const rows = ['A', 'C', 'E', 'G', 'I', 'K', 'M'];
  const leftCols = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const rightCols = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];

  return (
    <div className="flex flex-row justify-start items-start gap-spacing-700">
      <div className="flex flex-row gap-spacing-100">
        <div className="flex flex-col gap-spacing-300">
          <div className="flex flex-col gap-spacing-100">
            <GuideText text="#" />
            <GuideText text="A" />
            <GuideText text="B" />
          </div>
          {rows.slice(1).map((row, index) => (
            <div key={row} className="flex flex-col gap-spacing-100">
              <GuideText text={row} />
              <GuideText text={String.fromCharCode(row.charCodeAt(0) + 1)} />
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-spacing-300">
          <div className="flex flex-col gap-spacing-100">
            <div className="flex flex-row gap-spacing-100">
              {leftCols.map((col) => (
                <GuideText key={col} text={col} />
              ))}
            </div>
            <div className="flex flex-row gap-spacing-100">
              {leftCols.map((col) => (
                <SeatPair key={col} row="A" col={col} />
              ))}
            </div>
          </div>
          {rows.slice(1).map((row) => (
            <div key={row} className="flex flex-col gap-spacing-100">
              <div className="flex flex-row gap-spacing-100">
                {leftCols.map((col) => (
                  <SeatPair key={col} row={row} col={col} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-spacing-300">
        <div className="flex flex-col gap-spacing-100">
          <div className="flex flex-row gap-spacing-100">
            {rightCols.map((col) => (
              <GuideText key={col} text={col} />
            ))}
          </div>
          <div className="flex flex-row gap-spacing-100">
            {rightCols.map((col) => (
              <SeatPair key={col} row="A" col={col} />
            ))}
          </div>
        </div>
        {rows.slice(1).map((row) => (
          <div key={row} className="flex flex-col gap-spacing-100">
            <div className="flex flex-row gap-spacing-100">
              {rightCols.map((col) => (
                <SeatPair key={col} row={row} col={col} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StayApply = () => (
  <Box title="잔류 신청" description="잔류를 신청해 주세요.">
    <div className="flex flex-col md:flex-row justify-start items-start w-full gap-spacing-700">
      <div className="w-full h-[200px] md:h-[400px] md:w-[500px] overflow-auto flex-shrink-0">
        <Seats />
      </div>
      <div className="md:h-[400px] w-full flex flex-col justify-between items-start gap-spacing-700">
        <div className="w-full flex flex-row flex-wrap md:flex-col justify-start items-start gap-spacing-200">
          <div className="flex flex-row justify-start items-center gap-spacing-200">
            <div className="w-[20px] h-[15px] rounded-radius-100 bg-core-accent-translucent" />
            <span className="text-caption text-content-standard-primary">이미 신청된 자리</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-spacing-200">
            <div className="w-[20px] h-[15px] rounded-radius-100 bg-core-accent" />
            <span className="text-caption text-content-standard-primary">현재 선택한 자리</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-spacing-200">
            <div className="w-[20px] h-[15px] rounded-radius-100 bg-background-standard-secondary border border-core-accent-translucent" />
            <span className="text-caption text-content-standard-primary">선택 가능한 자리</span>
          </div>
          <div className="flex flex-row justify-start items-center gap-spacing-200">
            <div className="w-[20px] h-[15px] rounded-radius-100 bg-components-translucent-secondary" />
            <span className="text-caption text-content-standard-primary">선택 불가한 자리</span>
          </div>
        </div>
        <div className="w-full flex flex-col justify-start items-start gap-spacing-200">
          <strong className="text-label">좌석 선택</strong>
          <div className="w-full flex flex-row justify-start items-center gap-spacing-200">
            <span className="text-footnote text-content-standard-tertiary">내가 선택한 좌석</span>

            <strong className="text-label text-core-accent">C4</strong>
          </div>
          <div className="w-full flex justify-start items-start px-spacing-400 py-spacing-300 bg-background-standard-secondary rounded-radius-200">
            <span className="text-caption text-content-standard-tertiary">미선택 사유</span>
          </div>
          <div className="w-full flex justify-start items-start px-spacing-400 py-spacing-300 bg-core-accent rounded-radius-200">
            <strong className="text-footnote text-content-inverted-primary">잔류 신청하기</strong>
          </div>
        </div>
      </div>
    </div>
  </Box>
);

export default StayApply;
