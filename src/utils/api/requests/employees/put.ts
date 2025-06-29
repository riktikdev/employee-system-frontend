import { UpdateEmployeeRequest } from '@/generated/api';
import { FetchesRequestConfig } from '@siberiacancode/fetches';
import { api } from '../../instance';
import { Employee } from '@/types/employee';

export type UpdateEmployeeParams = UpdateEmployeeRequest & {
  id: number;
};
export type UpdateEmployeeRequestConfig =
  FetchesRequestConfig<UpdateEmployeeParams>;

export const updateEmployee = ({
  config,
  params,
}: UpdateEmployeeRequestConfig) => {
  return api.put<Employee>(`/employees/${params.id}`, params, config);
};
