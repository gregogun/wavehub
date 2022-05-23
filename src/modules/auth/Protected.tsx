import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

interface ProtectedProps {
  children: JSX.Element;
}

export const Protected = ({ children }: ProtectedProps) => {
  const router = useRouter();
  const { walletAddress } = useAuth();

  const isLoggedIn = useMemo(() => {
    if (walletAddress) {
      return true;
    }

    if (!walletAddress) {
      return false;
    }
  }, [walletAddress]);

  if (typeof window === 'undefined') {
    return null;
  }

  if (!isLoggedIn) {
    router.push('/');
    return null;
  }

  return children;
};
