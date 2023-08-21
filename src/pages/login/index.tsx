import { useFormik } from 'formik';
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { validationSchema } from '../../utils/ValidateLoginForm';
import useNotification from '../../hooks/useNotification';

type LoginDataType = {
  email: string;
  password: string;
};

export default function Login(): JSX.Element {
  const { toast } = useNotification();

  const formik = useFormik<LoginDataType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        toast(`Bienvenido ${values.email}`, 'success');
      } catch (error) {
        toast((error as Error).message, 'error');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // const [loginData, setLoginData] = useState<LoginDataType>({
  //   email: '',
  //   password: '',
  // });

  // function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
  //   setLoginData({ ...loginData, [e.target.name]: e.target.value });
  // }

  // function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
  //   try {
  //     e.preventDefault();
  //     const validatedData = validationSchema.validateSync(loginData, {
  //       abortEarly: true,
  //     });
  //     toast(`Bienvenido ${validatedData.email}`, 'success');
  //   } catch (error) {
  //     toast((error as Yup.ValidationError).message, 'error');
  //   }
  // }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh' }}>
        <Grid item sx={{ width: '100%' }}>
          <Paper sx={{ padding: '1.2em' }}>
            <Typography variant="h4" textAlign="center" marginBottom="0.5em">
              Iniciar sesión
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  value={formik.values.email}
                  fullWidth
                  label="Correo"
                  type="email"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  name="password"
                  value={formik.values.password}
                  fullWidth
                  label="Contraseña"
                  type="password"
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
                <Button fullWidth type="submit" variant="contained">
                  Iniciar sesión
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
