import FrigoApply from '@/components/sections/FrigoApply';
import LaundryApply from '@/components/sections/LaundryApply';
import MyStatus from '@/components/sections/MySatus';
import StayApply from '@/components/sections/StayApply';
import StayOutgoApply from '@/components/sections/StayOutgoApply';
import Footer from '@/components/widgets/Footer';
import Header from '@/components/widgets/Header';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl text-heading">
      <Header isForSpace={true} />
      <div className="flex flex-col justify-center items-center w-full px-spacing-400 py-spacing-700 gap-spacing-400">
        <MyStatus />
        <LaundryApply />
        <StayApply />
        <StayOutgoApply />
        <FrigoApply />
      </div>
      <Footer />
    </div>
  );
}
