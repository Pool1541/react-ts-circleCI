import { Container, Button } from '@mui/material';

export default function Login(): JSX.Element {
  return (
    <Container maxWidth="xl" sx={{ mt: 9 }}>
      <Button fullWidth variant="contained">
        Registo
      </Button>
    </Container>
  );
}
