import { lazy } from 'react';

export { default as home } from './home';

export const Login = lazy(() => import('./login'));
export const Character = lazy(() => import('./character'));
export const Signup = lazy(() => import('./signup'));
export const ToastExample = lazy(() => import('./toastExample'));
