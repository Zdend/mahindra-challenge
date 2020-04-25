import React, { Suspense } from 'react';
import { Global } from '@emotion/core';
import { globalStyles } from './styles/global';

const ProgressBarView = React.lazy(() => import('./views/ProgressBarView'))

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Suspense fallback={<div>Loading...</div>}>
        <ProgressBarView />
      </Suspense>
    </div>
  );
}

export default App;
