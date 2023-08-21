import { Container, Button, Stack, AlertColor } from '@mui/material';
import useNotification from '../../hooks/useNotification';
import { useEffect } from 'react';
import { getCharacterById } from '../../services/characters';

export default function ToastExample(): JSX.Element {
  const { toast } = useNotification();

  function handleClick(message: string, severity: AlertColor) {
    toast(message, severity);
  }

  useEffect(() => {
    getCharacterById(1)
      .then(({ data }) => console.log(data))
      .catch(console.log);
  }, []);

  return (
    <Container maxWidth="xl">
      <Stack spacing={2} sx={{ mt: 4 }}>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleClick('Se realizó la acción correctamente', 'success')}
          color="success"
          sx={{ padding: '1em 0' }}>
          Success
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() =>
            handleClick('Haz click en los otros botones para ver los mensajes', 'info')
          }
          color="info"
          sx={{ padding: '1em 0' }}>
          info
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleClick('El usuario/contraseña es incorrecto', 'error')}
          color="error"
          sx={{ padding: '1em 0' }}>
          Error
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => handleClick('Solo te quedan tres intentos', 'warning')}
          color="warning"
          sx={{ padding: '1em 0' }}>
          Warning
        </Button>
      </Stack>
    </Container>
  );
}
