import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase.config';
import { UserCredentials } from '../types/user.type';

export async function authUserWithEmailAndPassword({ email, password }: UserCredentials) {
  const authenticatedUser = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return authenticatedUser;
}

export async function logOut() {
  await signOut(firebaseAuth)
    .then(() => console.log('Se cerró la sesión correctamente'))
    .catch((error) => console.log(error));
}
