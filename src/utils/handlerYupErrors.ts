import * as Yup from 'yup';
import { AlertColor } from '@mui/material';

export function handlerYupErrors(
  validationError: Yup.ValidationError,
  toast: (message: string, severity: AlertColor) => void
) {
  const fields: Array<string> = [];
  const errors = validationError.inner.reduce((result: Array<string>, error) => {
    if (!fields.includes(error.path as string)) {
      fields.push(error.path as string);
      result.push(error.message);
    }
    return result;
  }, []);
  errors.forEach((error) => toast(error, 'error'));
}
