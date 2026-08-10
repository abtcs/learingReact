import React, { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./Users'));

function Lazy() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

export default Lazy;