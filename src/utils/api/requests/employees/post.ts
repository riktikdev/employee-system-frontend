import { CreateEmployeeRequest } from '@/generated/api';
import { FetchesRequestConfig } from '@siberiacancode/fetches';
import { api } from '../../instance';
import { Employee } from '@/types/employee';

export type CreateEmployeeParams = CreateEmployeeRequest & {
  role: string;
  password: string;
  username: string;
};
export type CreateEmployeeRequestConfig =
  FetchesRequestConfig<CreateEmployeeParams>;

export const postCreateEmployee = ({
  config,
  params,
}: CreateEmployeeRequestConfig) => {
  api.post<Employee>('/employees', params, config);
};
