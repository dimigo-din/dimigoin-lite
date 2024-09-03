import './globals.css';
import localFont from 'next/font/local';

const suit = localFont({
  src: [
    {
      path: './fonts/SUIT-Variable.woff2',
    },
  ],

  variable: '--font-suit',
});

export const metadata = {
  title: '디미고인 Lite',
  description:
    '한국디지털미디어고등학교 인트라넷, 디미고인 Lite. 디미고인 Lite는 디미고인의 기능을 최대한 유지하면서도 불필요한 기능을 제거하여 가벼운 사용 경험을 제공합니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta name="theme-color" content="#5941F5" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#5941F5" />
        <meta property="og:image" content="https://lite.dimigo.in/images/banner.png" />
      </head>
      <body className={suit.className}>{children}</body>
    </html>
  );
}
