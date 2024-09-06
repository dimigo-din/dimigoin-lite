import Box from '@/components/widgets/Box';

export default function MyStatus() {
  return (
    <Box title="나의 신청 현황" description="나의 신청 현황을 확인해주세요." isExpandable={false}>
      <div className="w-full flex flex-row items-center justify-around px-spacing-500 py-spacing-200">
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">잔류</span>
          <strong className="text-heading text-core-accent">H11</strong>
        </div>
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">세탁</span>
          <strong className="text-heading text-core-accent">5층 3타임</strong>
        </div>
        <div className="flex flex-col justify-center items-center gap-spacing-100">
          <span className="text-label text-content-standard-primary">금요귀가</span>
          <span className="text-heading text-content-standard-quaternary">미신청</span>
        </div>
      </div>
    </Box>
  );
}
