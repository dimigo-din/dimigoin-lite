import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-4xl px-spacing-550 py-spacing-700 flex flex-col md:flex-row justify-between items-center gap-spacing-300">
        <Link
          href="https://github.com/dimigo-din"
          target="_blank"
          rel="noreferrer"
          className="flex flex-row justify-center items-center gap-spacing-500 self-start">
          <Image src="/images/din_logo.svg" alt="din_logo" width={40} height={40} />
          <div className="flex flex-col justify-start items-start">
            <strong className="text-content-standard-primary text-title">DIN</strong>
            <strong className="text-content-standard-tertiary text-footnote">DIMIGO INTRANET</strong>
          </div>
        </Link>
        <div className="flex flex-col gap-spacing-100 items-end self-end">
          <span className="text-label text-content-standard-tertiary">
            Designed by{' '}
            <Link href="https://www.instagram.com/jiinnuukk/" target="_blank" rel="noreferrer">
              jiinnuukk
            </Link>
            {' / '}
            Developed by{' '}
            <Link href="https://github.com/sspzoa" target="_blank" rel="noreferrer">
              sspzoa
            </Link>
          </span>
          <strong className="text-label text-content-standard-tertiary">
            &copy; 2024{' '}
            <Link href="https://github.com/dimigo-din" target="_blank" rel="noreferrer">
              DIN
            </Link>{' '}
            All rights reserved
          </strong>
        </div>
      </div>
    </div>
  );
}
