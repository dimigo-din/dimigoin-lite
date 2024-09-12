'use client';

import StayOutgoApply from '@/components/sections/StayOutgoApply';
import Box from '@/components/widgets/Box';
import { useStayApplication } from '@/hooks/useStayApplication';
import React, { useState } from 'react';
import { MaterialSymbol } from 'react-material-symbols';

const GuideText = ({ text }) => (
  <div className="w-[40px] h-[30px] rounded-radius-100 flex justify-center items-center">
    <span className="text-caption text-center text-content-standard-primary">{text}</span>
  </div>
);

const SkeletonLoader = () => (
  <div className="w-full h-[200px] md:h-[400px] md:w-[500px] bg-background-standard-secondary rounded animate-pulse" />
);

const SkeletonButton = () => (
  <div className="w-full h-[44px] bg-background-standard-secondary rounded-radius-200 animate-pulse" />
);

const SkeletonTextInput = () => (
  <div className="w-full h-[36px] bg-background-standard-secondary rounded-radius-200 animate-pulse" />
);

const Seat = ({ type, studentId, name, coordinate, onClick, isSelectable }) => {
  const baseClasses = 'w-[40px] h-[30px] rounded-radius-100 flex justify-center items-center';
  const contentClasses = 'text-[10px] leading-[10px] text-center';

  const seatTypes = {
    reserved: `${baseClasses} bg-core-accent-translucent cursor-not-allowed`,
    selected: `${baseClasses} bg-core-accent cursor-pointer`,
    available: `${baseClasses} ${isSelectable ? 'bg-background-standard-secondary border border-core-accent-secondary cursor-pointer' : 'bg-components-translucent-secondary cursor-not-allowed'}`,
  };

  const handleInteraction = () => {
    if ((type === 'available' && isSelectable) || type === 'selected') {
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
      role={(type === 'available' && isSelectable) || type === 'selected' ? 'button' : 'presentation'}
      tabIndex={(type === 'available' && isSelectable) || type === 'selected' ? 0 : -1}
      aria-pressed={type === 'selected'}>
      {type === 'available' ? (
        <span
          className={`${contentClasses} ${isSelectable ? 'text-content-standard-tertiary' : 'text-content-standard-quaternary'}`}>
          {coordinate}
        </span>
      ) : (
        <span
          className={`${contentClasses} ${type === 'selected' ? 'text-content-inverted-primary' : 'text-content-standard-primary'}`}>
          {studentId}
          <br />
          {name}
        </span>
      )}
    </div>
  );
};

const SeatPair = ({ row, col, selectedSeat, reservedSeats, currentUser, onSeatSelect, selectableSeats }) => {
  const generateSeat = React.useCallback(
    (seatRow, seatCol) => {
      const coordinate = `${seatRow}${seatCol}`;
      const isSelectable = selectableSeats.includes(coordinate);

      if (selectedSeat === coordinate) {
        return (
          <Seat
            type="selected"
            studentId={
              currentUser.grade.toString() +
              currentUser.class.toString().padStart(2, '0') +
              currentUser.number.toString().padStart(2, '0')
            }
            name={currentUser.name}
            coordinate={coordinate}
            onClick={onSeatSelect}
            isSelectable={true}
          />
        );
      }

      const reservedSeat = reservedSeats.find((seat) => seat.coordinate === coordinate);
      if (reservedSeat) {
        return (
          <Seat
            type="reserved"
            studentId={reservedSeat.studentId}
            name={reservedSeat.name}
            coordinate={coordinate}
            onClick={onSeatSelect}
            isSelectable={false}
          />
        );
      }

      return <Seat type="available" coordinate={coordinate} onClick={onSeatSelect} isSelectable={isSelectable} />;
    },
    [selectedSeat, reservedSeats, currentUser, onSeatSelect, selectableSeats],
  );

  return (
    <div className="flex flex-col gap-spacing-150">
      {generateSeat(row, col)}
      {generateSeat(String.fromCharCode(row.charCodeAt(0) + 1), col)}
    </div>
  );
};

const Seats = ({ selectedSeat, reservedSeats, currentUser, onSeatSelect, selectableSeats }) => {
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
                <SeatPair
                  key={col}
                  row="A"
                  col={col}
                  selectedSeat={selectedSeat}
                  reservedSeats={reservedSeats}
                  currentUser={currentUser}
                  onSeatSelect={onSeatSelect}
                  selectableSeats={selectableSeats}
                />
              ))}
            </div>
          </div>
          {rows.slice(1).map((row) => (
            <div key={row} className="flex flex-col gap-spacing-150">
              <div className="flex flex-row gap-spacing-150">
                {leftCols.map((col) => (
                  <SeatPair
                    key={col}
                    row={row}
                    col={col}
                    selectedSeat={selectedSeat}
                    reservedSeats={reservedSeats}
                    currentUser={currentUser}
                    onSeatSelect={onSeatSelect}
                    selectableSeats={selectableSeats}
                  />
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
              <SeatPair
                key={col}
                row="A"
                col={col}
                selectedSeat={selectedSeat}
                reservedSeats={reservedSeats}
                currentUser={currentUser}
                onSeatSelect={onSeatSelect}
                selectableSeats={selectableSeats}
              />
            ))}
          </div>
        </div>
        {rows.slice(1).map((row) => (
          <div key={row} className="flex flex-col gap-spacing-150">
            <div className="flex flex-row gap-spacing-150">
              {rightCols.map((col) => (
                <SeatPair
                  key={col}
                  row={row}
                  col={col}
                  selectedSeat={selectedSeat}
                  reservedSeats={reservedSeats}
                  currentUser={currentUser}
                  onSeatSelect={onSeatSelect}
                  selectableSeats={selectableSeats}
                />
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

const StayListModal = ({ isOpen, onClose, applications }) => {
  if (!isOpen) return null;

  const groupedApplications = applications.reduce((acc, app) => {
    const classKey = `${app.student.grade}-${app.student.class}`;
    if (!acc[classKey]) {
      acc[classKey] = [];
    }
    acc[classKey].push(app);
    return acc;
  }, {});

  const sortedClasses = Object.entries(groupedApplications).sort((a, b) => {
    const [aGrade, aClass] = a[0].split('-');
    const [bGrade, bClass] = b[0].split('-');
    return aGrade - bGrade || aClass.localeCompare(bClass);
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="h-full md:h-auto md:max-h-[80vh] w-full md:max-w-[600px] md:m-spacing-200 flex flex-col gap-spacing-300 bg-background-standard-primary p-spacing-550 rounded-radius-300 overflow-auto">
        <div className="flex justify-between items-center">
          <strong className="text-heading text-content-standard-primary">잔류 신청 목록</strong>
          <button type="button" onClick={onClose} className="text-content-standard-primary">
            <MaterialSymbol weight={300} icon="close" size={24} />
          </button>
        </div>
        <div className="overflow-x-auto">
          {sortedClasses.map(([classKey, classApps]) => {
            // Sort students by number within each class
            const sortedApps = classApps.sort((a, b) => a.student.number - b.student.number);

            return (
              <div key={classKey} className="mb-spacing-400">
                <h3 className="text-subheading text-content-standard-primary mb-spacing-200">
                  {classKey.split('-')[0]}학년 {classKey.split('-')[1]}반
                </h3>
                <table className="w-full">
                  <thead>
                    <tr className="bg-background-standard-secondary">
                      <th className="p-spacing-200 text-left">번호</th>
                      <th className="p-spacing-200 text-left">이름</th>
                      <th className="p-spacing-200 text-left">좌석</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedApps.map((app, index) => (
                      <tr key={index} className="border-b border-background-standard-secondary">
                        <td className="p-spacing-200">{app.student.number}</td>
                        <td className="p-spacing-200">{app.student.name}</td>
                        <td className="p-spacing-200">{app.seat === 'NONE' ? '미선택' : app.seat}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default function StayApply({ refreshMyStatus }) {
  const {
    selectedSeat,
    unselectedReason,
    currentUser,
    reservedSeats,
    selectableSeats,
    loading,
    error,
    hasExistingApplication,
    handleSeatSelect,
    handleUnselectedReasonChange,
    handleSubmit,
    stayData,
  } = useStayApplication(refreshMyStatus);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStayListModalOpen, setIsStayListModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openStayListModal = () => setIsStayListModalOpen(true);
  const closeStayListModal = () => setIsStayListModalOpen(false);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <Box
        title="잔류 신청"
        description={hasExistingApplication ? '현재 잔류 신청 현황입니다.' : '원하시는 잔류 좌석을 선택해주세요.'}>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row justify-start items-start w-full gap-spacing-700">
          <div className="w-full flex flex-col justify-end items-end gap-spacing-200">
            <div className="w-full h-[200px] md:h-[400px] md:w-[500px] overflow-auto flex-shrink-0">
              {loading ? (
                <SkeletonLoader />
              ) : (
                <Seats
                  selectedSeat={selectedSeat}
                  reservedSeats={reservedSeats}
                  currentUser={currentUser}
                  onSeatSelect={handleSeatSelect}
                  selectableSeats={selectableSeats}
                  isSelectable={!hasExistingApplication}
                />
              )}
            </div>
            <div className="flex flex-row gap-spacing-300">
              <div
                className="flex flex-row gap-spacing-100 justify-center items-center cursor-pointer"
                onClick={openStayListModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && StayListModal()}>
                <MaterialSymbol icon="people" size={16} weight={300} className="text-content-standard-tertiary" />
                <strong className="text-label text-content-standard-tertiary">신청 목록 보기</strong>
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
          </div>
          <div className="md:h-[430px] w-full flex flex-col justify-between items-start gap-spacing-700">
            <div className="w-full flex flex-row flex-wrap md:flex-col justify-start items-start gap-spacing-200">
              <LegendItem color="bg-core-accent-translucent" text="이미 신청된 자리" />
              <LegendItem color="bg-core-accent" text="현재 선택한 자리" />
              <LegendItem
                color="bg-background-standard-secondary border border-core-accent-secondary"
                text="선택 가능한 자리"
              />
              <LegendItem color="bg-components-translucent-secondary" text="선택 불가능한자리" />
            </div>
            <div className="w-full flex flex-col justify-start items-start gap-spacing-200">
              <strong className="text-label">좌석 선택</strong>
              {loading ? (
                <>
                  <div className="w-full flex flex-row justify-start items-center gap-spacing-200">
                    <div className="w-[80px] h-[20px] bg-background-standard-secondary rounded animate-pulse" />
                    <div className="w-[36px] h-[22px] bg-background-standard-secondary rounded animate-pulse" />
                  </div>
                  <SkeletonTextInput />
                  <SkeletonButton />
                </>
              ) : (
                <>
                  <div className="w-full flex flex-row justify-start items-center gap-spacing-200">
                    <span className="text-footnote text-content-standard-tertiary">
                      {hasExistingApplication ? '신청된 좌석' : '내가 선택한 좌석'}
                    </span>
                    <strong className="text-label text-core-accent">
                      {selectedSeat === null ? '미선택' : selectedSeat}{' '}
                    </strong>
                  </div>
                  {!hasExistingApplication && (
                    <TextInput
                      value={unselectedReason}
                      onChange={handleUnselectedReasonChange}
                      placeholder="미선택 사유를 입력해주세요"
                      disabled={selectedSeat !== null}
                      required={selectedSeat === null}
                    />
                  )}
                  <Button type="submit" primary>
                    <span className="text-center w-full">
                      {hasExistingApplication ? '잔류 신청 취소하기' : '잔류 신청하기'}
                    </span>
                  </Button>
                </>
              )}
            </div>
          </div>
        </form>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="w-full h-full overflow-auto">
          {loading ? (
            <SkeletonLoader />
          ) : (
            <Seats
              selectedSeat={selectedSeat}
              reservedSeats={reservedSeats}
              currentUser={currentUser}
              onSeatSelect={handleSeatSelect}
              selectableSeats={selectableSeats}
              isSelectable={!hasExistingApplication}
            />
          )}
        </div>
      </Modal>
      <StayListModal
        isOpen={isStayListModalOpen}
        onClose={closeStayListModal}
        applications={stayData?.applications || []}
      />
      {hasExistingApplication && <StayOutgoApply />}
    </>
  );
}
