import Box from '@/components/widgets/Box';
import { Span } from 'next/dist/server/lib/trace/tracer';

export default function StayApply() {
  return (
    <Box title="잔류 신청" description="잔류를 신청해 주세요.">
      <span className="text-content-standard-primary text-display">Content</span>
    </Box>
  );
}
