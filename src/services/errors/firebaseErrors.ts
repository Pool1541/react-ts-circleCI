type FirebaseCodeErrorsType = {
  [key: string]: string;
};

export const firebaseCodeErros: FirebaseCodeErrorsType = {
  'auth/credential-already-in-use': 'Las credenciales ya están en uso',
  'auth/email-already-in-use': 'El email ya está en uso',
  'auth/internal-error': 'Error inesperado',
  'auth/invalid-user-token': 'El token no es válido',
  'auth/invalid-email': 'El email no es válido',
  'auth/unauthorized-domain': 'Este dominio no está autorizado',
  'auth/wrong-password': 'Contraseña incorrecta',
  'auth/account-exists-with-different-credential': 'La cuenta ya existe',
  'auth/null-user': 'Usuario vacío',
  'auth/operation-not-allowed': 'Operación no permitida',
  'auth/operation-not-supported-in-this-environment': 'Operación no permitida en este entorno',
  'auth/quota-exceeded': 'Cuota excedida',
  'auth/timeout': 'Tiempo agotado',
  'auth/user-token-expired': 'El token ha expirado',
  'auth/too-many-requests': 'Hiciste demasiados intentos, vuelve a intentarlo más tarde',
  'auth/unverified-email': 'Email sin verificar, verifica tu email y vuelve a intentarlo',
  'auth/user-cancelled': 'Usuario cancelado',
  'auth/user-not-found': 'Usuario no encontrado',
  'auth/user-disabled': 'Usuario desabilitado',
  'auth/user-signed-out': 'El usuario ha cerrado la sesión',
  'auth/weak-password': 'Intenta con otra contraseña',
  default: 'Error interno, vuelve a intentarlo más tarde',
};
