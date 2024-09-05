import Box from '@/components/widgets/Box';
import { Span } from 'next/dist/server/lib/trace/tracer';

export default function LaundryApply() {
  return (
    <Box title="세탁기 및 건조기 신청" description="세탁기 및 건조기를 신청해주세요.">
      <span className="text-content-standard-primary text-display">Content</span>
    </Box>
  );
}
