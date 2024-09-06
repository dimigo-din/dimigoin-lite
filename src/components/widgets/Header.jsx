import Image from 'next/image';
import Link from 'next/link';

export default function Header({ isForSpace = false }) {
  const headerClasses = isForSpace
    ? 'w-full flex justify-center items-center opacity-0'
    : 'fixed top-0 w-full flex justify-center items-center bg-background-standard-secondary[0.2] backdrop-blur';

  return (
    <div className={headerClasses}>
      <div className="w-full max-w-4xl px-spacing-550 py-spacing-700 flex flex-row justify-between items-center">
        <Link href={'/'} className="flex flex-row justify-center items-center gap-spacing-300">
          <Image src="/images/dimigoin_logo.svg" alt="dimigoin_logo" width={32} height={32} />
          <strong className="text-content-standard-primary text-body">디미고인 Lite</strong>
        </Link>
        <div className="flex flex-row gap-spacing-400 items-center">
          <span className="text-footnote text-content-standard-tertiary">로그아웃</span>
          <strong className="text-body text-content-standard-primary">2209 김진욱</strong>
        </div>
      </div>
    </div>
  );
}
