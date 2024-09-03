import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-3xl px-[24px] py-[32px] flex flex-row justify-between items-center">
        <Link href={'/'}>
          <Image src="/images/dimigoin_logo.svg" alt="dimigoin_logo" width={32} height={32} />
        </Link>
        <div className="flex flex-row gap-[16px] items-center">
          <span className="text-footnote text-content-standard-tertiary">로그아웃</span>
          <strong className="text-body text-content-standard-primary">2209 김진욱</strong>
        </div>
      </div>
    </div>
  );
}
