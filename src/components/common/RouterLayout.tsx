import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function RouterLayout(): JSX.Element {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
