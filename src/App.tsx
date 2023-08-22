import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './Router';
import NotificationProvider from './context/NotificationContext';
import AuthContextProvider from './context/AuthContext';

function App() {
  return (
    <AuthContextProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Suspense fallback={<></>}>
            <AppRouter />
          </Suspense>
        </BrowserRouter>
      </NotificationProvider>
    </AuthContextProvider>
  );
}

export default App;
