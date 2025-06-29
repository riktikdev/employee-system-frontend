import { api } from '@/utils/api/instance';

import { FetchesRequestConfig } from '@siberiacancode/fetches';

export type LogoutRequestConfig = FetchesRequestConfig;

export const logout = ({ config, params }: LogoutRequestConfig) =>
  api.post('/auth/logout', params, config);
