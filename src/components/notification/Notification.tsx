import { Snackbar, Alert, AlertColor, Typography } from '@mui/material';
import Slide from '@mui/material/Slide';

type NotificationProps = {
  open: boolean;
  message: string;
  severity: AlertColor | undefined;
  handleClose: () => void;
};

export default function Notification({
  open,
  message,
  severity,
  handleClose,
}: NotificationProps): JSX.Element {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      autoHideDuration={4000}
      open={open}
      onClose={handleClose}
      TransitionComponent={Slide}>
      <Alert onClose={handleClose} severity={severity}>
        <Typography>{message}</Typography>
      </Alert>
    </Snackbar>
  );
}
