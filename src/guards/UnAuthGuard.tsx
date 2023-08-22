import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '../config/routes';
import { useAppSelector } from '../redux/hooks';

export default function UnAuthGuard() {
  const { isAuth } = useAppSelector((state) => state.authReduce);

  return isAuth ? <Navigate replace to={Routes.Home} /> : <Outlet />;
}
