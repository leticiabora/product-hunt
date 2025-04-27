'use client';

import Homepage from '@/components/pages/Homepage/Homepage';
import { Loading } from '@/components/pages/Homepage/Loading/Loading';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Homepage />
    </Suspense>
  );
}
