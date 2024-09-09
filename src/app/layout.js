import './globals.css';
import localFont from 'next/font/local';
import 'react-material-symbols/rounded';
import "react-toastify/ReactToastify.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import {ToastContainer} from "react-toastify";

const suit = localFont({
  src: [
    {
      path: './fonts/SUIT-Variable.woff2',
    },
  ],

  variable: '--font-suit',
});

export const metadata = {
  title: '디미고인 라이트',
  description:
    '한국디지털미디어고등학교 인트라넷, 디미고인 라이트. 디미고인 라이트는 디미고인의 기능을 최대한 유지하면서도 불필요한 기능을 제거하여 가벼운 사용 경험을 제공합니다.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta property="og:image" content="https://lite.dimigo.in/images/og-image.png" />
        <meta name="viewport" content="initial-scale=1, viewport-fit=cover" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-status-bar-style" media="(prefers-color-scheme: light)" content="#F6F6FA" />
        <meta name="apple-mobile-web-app-status-bar-style" media="(prefers-color-scheme: dark)" content="#09090A" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F6F6FA" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#09090A" />
      </head>
      <body className={suit.className}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
          {children}
          <ToastContainer />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
