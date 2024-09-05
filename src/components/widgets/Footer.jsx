import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-4xl px-spacing-550 py-spacing-700 flex flex-row justify-between items-center">
        <Link href={'/'} className="flex flex-row justify-center items-center gap-spacing-300">
          <Image src="/images/dimigoin_logo.svg" alt="dimigoin_logo" width={32} height={32} />
          <strong className="text-core-accent text-body">디미고인 Lite</strong>
        </Link>
        <div className="flex flex-row gap-spacing-400 items-center">
          <strong className="text-body text-content-standard-primary">Copyright 2024 DIN All rights reserved</strong>
        </div>
      </div>
    </div>
  );
}
