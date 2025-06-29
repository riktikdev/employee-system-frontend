import type { LoginRequestConfig } from '../requests/auth/login';

import { useMutation } from '@tanstack/react-query';

import { login } from '../requests/auth/login';

export const useLogin = (
  settings?: MutationSettings<LoginRequestConfig, typeof login>,
) =>
  useMutation({
    mutationKey: ['login'],
    mutationFn: ({ config, params }) =>
      login({ config: { ...settings?.config, ...config }, params }),
    ...settings?.options,
  });
