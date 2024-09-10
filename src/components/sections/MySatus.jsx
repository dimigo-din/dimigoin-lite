'use client';

import Box from '@/components/widgets/Box';
import { useMyStatus } from '@/hooks/useMyStatus';
import React from 'react';

export default function MyStatus() {
  const { statusData, renderStatus } = useMyStatus();

  return (
    <Box title="나의 신청 현황" description="나의 신청 현황을 확인해주세요." isExpandable={false}>
      <div className="w-full flex flex-row items-center justify-around px-spacing-500 py-spacing-200">
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">잔류</span>
          {statusData.stay.status === 'NONE'
            ? renderStatus('신청', statusData.stay.reason)
            : renderStatus(statusData.stay.status, statusData.stay.status)}
        </div>
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">세탁</span>
          {renderStatus(statusData.laundry, statusData.laundry)}
        </div>
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">금요귀가</span>
          {renderStatus(statusData.frigo.status, statusData.frigo.status)}
        </div>
      </div>
    </Box>
  );
}
