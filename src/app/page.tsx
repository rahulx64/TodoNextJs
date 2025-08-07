'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie.includes('token=');
    router.push(token ? '/dashboard' : '/login');
  }, []);

  return <p>Redirecting...</p>;
}
