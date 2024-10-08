'use client';

import { getUserData, logout } from '@/service/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Header({ isForSpace = false }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await getUserData();
      if (userData) {
        setUser(userData);
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const headerClasses = isForSpace
    ? 'w-full flex justify-center items-center opacity-0'
    : 'z-50 fixed top-0 left-0 w-full flex justify-center items-center bg-background-standard-secondary[0.2] backdrop-blur';

  const formatUserInfo = (user) => {
    if (!user) return '';
    return `${user.grade}${user.class}${user.number.toString().padStart(2, '0')} ${user.name}`;
  };

  const renderUserInfo = () => {
    if (loading) {
      return <div className="h-[24px] w-[80px] bg-background-standard-tertiary rounded animate-pulse" />;
    }
    return user ? (
      <strong className="text-body text-content-standard-primary">{formatUserInfo(user)}</strong>
    ) : (
      <span className="text-body text-content-standard-tertiary">로그인 필요</span>
    );
  };

  return (
    <div className={headerClasses}>
      <div className="w-full max-w-4xl px-spacing-550 py-spacing-700 flex flex-row justify-between items-center">
        <Link href="/" className="flex flex-row justify-center items-center gap-spacing-300">
          <Image src="/images/dimigoin_logo.svg" alt="dimigoin_logo" width={32} height={32} />
          <span className="text-content-standard-tertiary text-body">
            <strong className="text-content-standard-primary">디미고인</strong> 라이트
          </span>
        </Link>
        <div className="flex flex-row gap-spacing-400 items-center">
          <span
            className="text-footnote text-content-standard-tertiary cursor-pointer"
            onClick={logout}
            onKeyDown={(e) => e.key === 'Enter' && logout()}>
            로그아웃
          </span>
          {renderUserInfo()}
        </div>
      </div>
    </div>
  );
}
