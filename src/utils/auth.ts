import { getCookie } from '@siberiacancode/reactuse';

export const isAuthenticated = () => {
  return getCookie('token') !== undefined;
};
