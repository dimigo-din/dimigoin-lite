import MyStatus from '@/components/sections/MyStatus';
import Footer from '@/components/widgets/Footer';
import Header from '@/components/widgets/Header';

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl text-heading">
      <Header isForSpace={true} />
      <Header />
      <div className="flex flex-col justify-center items-center w-full px-spacing-400 py-spacing-700 gap-spacing-400">
        <MyStatus />
      </div>
      <Footer />
    </div>
  );
}
