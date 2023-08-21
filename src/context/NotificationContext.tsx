import { AlertColor } from '@mui/material';
import { createContext, ReactNode, useState } from 'react';
import { Notification } from '../components';

type NotificationProps = {
  toast: (message: string, severity: AlertColor) => void;
};

type ProviderProps = {
  children: ReactNode;
};

export const NotificationContext = createContext<NotificationProps>({ toast: () => {} });

export default function NotificationProvider({ children }: ProviderProps) {
  const [message, setMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertColor | undefined>(undefined);

  function handleClose() {
    setOpen(false);
  }

  function toast(message: string, severity: AlertColor) {
    if (open) {
      handleClose();
    } else {
      setSeverity(severity);
      setOpen(true);
      setMessage(message);
    }
  }

  return (
    <NotificationContext.Provider value={{ toast }}>
      <Notification handleClose={handleClose} open={open} severity={severity} message={message} />
      {children}
    </NotificationContext.Provider>
  );
}
