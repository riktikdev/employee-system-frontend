import { useMutation } from '@tanstack/react-query';
import { logout, LogoutRequestConfig } from '../requests/auth/logout';
import { removeCookie } from '@siberiacancode/reactuse';

export const useLogout = (
  settings?: MutationSettings<LogoutRequestConfig, typeof logout>,
) =>
  useMutation({
    mutationKey: ['logout'],
    mutationFn: ({ config, params }) =>
      logout({ config: { ...settings?.config, ...config }, params }),
    ...settings?.options,
    onSuccess() {
      removeCookie('token');
    },
  });
