import React from 'react';
import { MaterialSymbol } from 'react-material-symbols';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@/components/widgets/Box';
import { useStayOutgo } from '@/hooks/useStayOutgo';

const MEALS = [
  { display: '조식', value: 'breakfast' },
  { display: '중식', value: 'lunch' },
  { display: '석식', value: 'dinner' },
];

const SkeletonLoader = () => (
  <div className="w-full h-[380px] md:w-[864px] bg-background-standard-tertiary rounded-radius-600 animate-pulse" />
);

const TextLabel = ({ children, className = '' }) => <span className={`text-label ${className}`}>{children}</span>;

const TimeSelector = ({ label, value, onChange }) => (
  <div className="flex flex-col justify-start items-start gap-spacing-200">
    <TextLabel className="text-content-standard-tertiary">{label}</TextLabel>
    <input
      type="time"
      value={value}
      onChange={onChange}
      className="w-[120px] px-spacing-300 py-spacing-150 bg-background-standard-secondary border border-line-outline rounded-radius-300 text-content-standard-tertiary text-footnote"
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
  const {
    stayOutgoData,
    loading,
    selectedDay,
    setSelectedDay,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    reason,
    setReason,
    selectedMeals,
    availableDates,
    applyForStayOutgo,
    cancelStayOutgoApplication,
    toggleMealCancel,
    applyPresetSettings,
    handleSubmit,
  } = useStayOutgo();

  const getStatusClass = (status) => {
    switch (status) {
      case 'A':
        return 'bg-solid-translucent-green';
      case 'R':
        return 'bg-solid-translucent-red';
      default:
        return 'bg-components-translucent-tertiary';
    }
  };

  const getMealsCancelledText = (meal) => {
    const cancelledMeals = Object.entries(meal)
      .filter(([_, isCancelled]) => isCancelled)
      .map(([mealType, _]) => {
        switch (mealType) {
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

    if (cancelledMeals.length === 0) return '';
    if (cancelledMeals.length === 1) return cancelledMeals[0];
    return `${cancelledMeals.slice(0, -1).join(', ')} 취소${cancelledMeals.slice(-1)}`;
  };

  const getStatusElement = (status) => {
    switch (status) {
      case 'A':
        return <strong className="text-label text-content-standard-primary flex-shrink-0">승인됨</strong>;
      case 'R':
        return <strong className="text-label text-content-standard-primary flex-shrink-0">반려됨</strong>;
      default:
        return <span className="text-label text-content-standard-quaternary flex-shrink-0">대기중</span>;
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '시간 미정';
    const date = new Date(dateString);
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const getTimeDisplay = (application) => {
    if (application.reason === '자기계발외출' || !application.reason) {
      return '10:20 ~ 14:00';
    }
    return `${formatTime(application.duration?.start)} ~ ${formatTime(application.duration?.end)}`;
  };

  if (loading) return <SkeletonLoader />;

  return (
    <>
      <Box title="잔류 중 외출 신청" description="잔류 중 외출을 신청해주세요.">
        <form onSubmit={handleSubmit} className="flex flex-col gap-spacing-550 w-full">
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-spacing-550">
            <div className="flex flex-col gap-spacing-200 justify-start items-start">
              <strong className="text-footnote text-content-standard-primary">외출 날짜 선택</strong>
              <div className="flex flex-row justify-center items-center gap-spacing-300">
                {availableDates.map((date) => (
                  <DaySelector
                    key={date.date}
                    day={{
                      display: date.display,
                      value: date.date,
                    }}
                    isSelected={selectedDay === date.date}
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
              onChange={(e) => setReason(e.target.value)}
              required
            />
            <Button onClick={applyPresetSettings}>자기계발외출</Button>
          </div>
          <Button type="submit" primary>
            외출 신청하기
          </Button>

          {stayOutgoData?.stayOutgos && stayOutgoData.stayOutgos.length > 0 && (
            <div className="w-full flex flex-col gap-spacing-400 justify-start items-start">
              <strong className="text-footnote text-content-standard-primary">신청 현황</strong>
              {stayOutgoData.stayOutgos.map((application) => (
                <div
                  key={application._id}
                  className={`flex flex-row px-spacing-500 py-spacing-400 ${getStatusClass(application.status)} gap-spacing-300 w-full rounded-radius-600 cursor-pointer`}
                  onClick={() => cancelStayOutgoApplication(application._id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      cancelStayOutgoApplication(application._id);
                    }
                  }}
                  role="button"
                  tabIndex={0}>
                  <strong className="text-label text-content-standard-primary flex-shrink-0">
                    {new Date(application.date).getDay() === 6 ? '토요일 외출' : '일요일 외출'}
                  </strong>
                  <span className="w-full text-label text-content-standard-secondary">
                    {application.reason || '자기계발외출'}
                    {getMealsCancelledText(application.meal) && ` / ${getMealsCancelledText(application.meal)}`}
                    {' / '}
                    {getTimeDisplay(application)}
                  </span>
                  {getStatusElement(application.status)}
                </div>
              ))}
            </div>
          )}
        </form>
      </Box>
    </>
  );
}
