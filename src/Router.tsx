import { Routes, Route } from 'react-router-dom';
import { Routes as appRoutes } from './config/routes';
import { ToastExample, Character, Login } from './pages';
import Home from './pages/home';
import RouterLayout from './components/common/RouterLayout';
import AuthGuard from './guards/AuthGuard';
import UnAuthGuard from './guards/UnAuthGuard';

export default function AppRouter(): JSX.Element {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path={appRoutes.Home} element={<RouterLayout />}>
          <Route path={appRoutes.Home} element={<Home />} />
          <Route path={appRoutes.ToastExample} element={<ToastExample />} />
          <Route path={`${appRoutes.Character}/:characterID`} element={<Character />} />
          <Route path="*" element={<div>404 No encontrado</div>} />
        </Route>
      </Route>
      <Route element={<UnAuthGuard />}>
        <Route path={appRoutes.Login} element={<Login />} />
        <Route path={appRoutes.Dashboard} element={<div>Dashboard</div>} />
      </Route>
    </Routes>
  );
}
