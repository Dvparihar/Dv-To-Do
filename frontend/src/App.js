import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Router } from './utils/router';
import PageLoading from './components/pageLoading';

const App = () => (
    <Suspense fallback={<PageLoading />}>
        <RouterProvider router={Router} />
    </Suspense>
);

export default App;
