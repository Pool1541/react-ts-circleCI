import { Navigate, Outlet } from 'react-router-dom';
import { Routes } from '../config/routes';
import { useAppSelector } from '../redux/hooks';

export default function AuthGuard() {
  const { isAuth } = useAppSelector((state) => state.authReduce);

  return isAuth ? <Outlet /> : <Navigate replace to={Routes.Login} />;
}
