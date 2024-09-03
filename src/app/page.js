import Box from '@/components/widgets/Box';
import Header from '@/components/widgets/Header';

export default function Home() {
  return (
    <div className="mx-auto max-w-[768px] text-heading">
      <Header />
      <div className="flex flex-col justify-center items-center w-full px-[16px] py-[32px] gap-[16px]">
        <Box>
          <strong className="text-4xl text-display text-center">Hello, World!</strong>
        </Box>
      </div>
    </div>
  );
}
