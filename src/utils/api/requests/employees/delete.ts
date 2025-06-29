import type { FetchesRequestConfig } from '@siberiacancode/fetches';

import { api } from '@/utils/api/instance';

export type DeleteEmployeeRequestConfig = FetchesRequestConfig<{ id: number }>;

export const deleteEmployee = ({
  params,
  config,
}: DeleteEmployeeRequestConfig) => {
  api.delete(`/employees/${params.id}`, config);
};
