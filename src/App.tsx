import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';
import NotificationProvider from './context/NotificationContext';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Suspense fallback={<></>}>
          <AppRouter />
        </Suspense>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
