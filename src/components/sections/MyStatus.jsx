'use client';

import FrigoApply from '@/components/sections/FrigoApply';
import LaundryApply from '@/components/sections/LaundryApply';
import StayApply from '@/components/sections/StayApply';
import Box from '@/components/widgets/Box';
import { useMyStatus } from '@/hooks/useMyStatus';
import { getUserData } from '@/service/auth';
import React, { useEffect, useState } from 'react';

const StatusItem = ({ label, status, renderStatus }) => (
  <div className="flex flex-col justify-center items-center gap-spacing-100">
    <span className="text-label text-content-standard-primary">{label}</span>
    {renderStatus(status, status)}
  </div>
);

const SkeletonLoader = () => (
  <div className="w-full flex flex-row items-center justify-around px-spacing-500 py-spacing-200">
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex flex-col justify-center items-center gap-spacing-100">
        <div className="w-16 h-[22px] bg-background-standard-secondary rounded animate-pulse" />
        <div className="w-20 h-[28px] bg-background-standard-secondary rounded animate-pulse" />
      </div>
    ))}
  </div>
);

export default function MyStatus() {
  const { statusData, isLoading, error, renderStatus, refreshStatus } = useMyStatus();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
    };
    fetchUserData();
  }, []);

  if (error) {
    return (
      <Box title="나의 신청 현황" description="나의 신청 현황을 확인해주세요." isExpandable={false}>
        <div className="w-full text-center text-red-500 py-spacing-200">{error}</div>
      </Box>
    );
  }

  const renderStatusItems = () => (
    <div className="w-full flex flex-row items-center justify-around px-spacing-500 py-spacing-200">
      <StatusItem
        label="잔류"
        status={statusData.stay.status === 'NONE' ? statusData.stay.reason : statusData.stay.status}
        renderStatus={renderStatus}
      />
      <StatusItem label="세탁" status={statusData.laundry} renderStatus={renderStatus} />
      <StatusItem label="금요귀가" status={statusData.frigo.status} renderStatus={renderStatus} />
    </div>
  );

  return (
    <>
      <Box title="나의 신청 현황" description="나의 신청 현황을 확인해주세요." isExpandable={false}>
        {isLoading ? <SkeletonLoader /> : renderStatusItems()}
      </Box>
      <LaundryApply refreshMyStatus={refreshStatus} />
      <StayApply refreshMyStatus={refreshStatus} />
      {user && user.grade === 3 && <FrigoApply refreshMyStatus={refreshStatus} />}
    </>
  );
}
