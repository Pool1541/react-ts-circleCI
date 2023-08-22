import { IFirebaseToken } from './../types/firebase.interface';
import jwtDecode from 'jwt-decode';
import { Settings, DateTime } from 'luxon';

export function decodeToken<T>(token: string): T {
  const decode: T = jwtDecode(token);
  return decode;
}

export function isTokenExpired(token: string): boolean {
  Settings.defaultZone = 'America/Buenos_Aires';
  Settings.defaultLocale = 'es';
  const { exp } = decodeToken<IFirebaseToken>(token);
  const now = DateTime.now().toMillis();

  return exp * 1000 <= now;
}
