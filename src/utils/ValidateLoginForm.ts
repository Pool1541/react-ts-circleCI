import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().required('Ingresa tu email').trim().email('Ingresa un email válido'),
  password: Yup.string()
    .required('Ingresa tu contraseña')
    .matches(/[0-Z]/, 'Tu contraseña no cumple con los requisitos mínimos'),
});
