import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import type { LoginRequest } from '@/generated/api';
import { api } from '@/utils/api/instance';

export type LoginParams = LoginRequest;
export type LoginRequestConfig = FetchesRequestConfig<LoginParams>;

export const login = ({ config, params }: LoginRequestConfig) =>
  api.post<{ token: string }>('/auth/login', params, config);
