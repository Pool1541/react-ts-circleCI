/* eslint-disable react-hooks/exhaustive-deps */
import { useFormik } from 'formik';
import { Box, Button, Container, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import { validationSchema } from '../../utils/ValidateLoginForm';
import useNotification from '../../hooks/useNotification';
import { authThunk } from '../../redux/thunks/auth.thunk';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useEffect } from 'react';
import { firebaseCodeErros } from '../../services/errors/firebaseErrors';

type LoginDataType = {
  email: string;
  password: string;
};

type FirebaseErrorType = {
  code: string;
  customData: unknown;
  name: string;
};

export default function Login(): JSX.Element {
  const { error } = useAppSelector((state) => state.authReduce);
  const { toast } = useNotification();
  const dispatch = useAppDispatch();

  const formik = useFormik<LoginDataType>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      try {
        dispatch(authThunk(values));
      } catch (error) {
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      const assertedError = error as FirebaseErrorType;
      toast(firebaseCodeErros[assertedError.code] || firebaseCodeErros['default'], 'error');
    }
  }, [error]);

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
