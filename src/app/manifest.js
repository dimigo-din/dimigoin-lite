export default function manifest() {
  return {
    name: '디미고인 라이트',
    short_name: '디미고인 라이트',
    description:
      '한국디지털미디어고등학교 인트라넷, 디미고인 라이트. 디미고인 라이트는 디미고인의 기능을 최대한 유지하면서도 불필요한 기능을 제거하여 가벼운 사용 경험을 제공합니다.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#F6F6FA',
    theme_color: '#E83C77',
    appleWebApp: true,
    icons: [
      {
        src: '/favicon.ico',
        type: 'image/x-icon',
        sizes: '16x16 32x32',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: './icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-192-maskable.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: './icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
