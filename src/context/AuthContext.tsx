/* eslint-disable react-hooks/exhaustive-deps */

import { ReactNode, createContext } from 'react';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

type ProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({});

export default function AuthContextProvider({ children }: ProviderProps) {
  const [, setCookie, remove] = useCookies();
  const { isExpired, accessToken } = useAppSelector((state) => state.authReduce);

  useEffect(() => {
    if (accessToken) {
      setCookie('accessToken', accessToken);
    }
  }, [accessToken]);

  useEffect(() => {
    if (isExpired) {
      remove('accessToken');
    }
  }, [isExpired]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
