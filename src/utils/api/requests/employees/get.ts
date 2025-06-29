import { FetchesRequestConfig } from '@siberiacancode/fetches';
import { api } from '../../instance';
import { Employee } from '@/types/employee';

export type GetAllEmployeesConfig = FetchesRequestConfig;

export const getAllEmployees = (config?: GetAllEmployeesConfig) => {
  return api.get<Employee[]>('/employees', config);
};

export interface GetEmployeeParams {
  id: number;
}
export type GetEmployeeRequestConfig = FetchesRequestConfig<GetEmployeeParams>;

export const getEmployee = ({ params, config }: GetEmployeeRequestConfig) => {
  return api.get<Employee>(`/employees/${params.id}`, config);
};
