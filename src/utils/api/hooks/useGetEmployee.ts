import { useQuery } from '@tanstack/react-query';
import {
  getEmployee,
  GetEmployeeRequestConfig,
  GetEmployeeParams,
} from '../requests/employees/get';

export const useGetEmployee = (
  params: GetEmployeeParams,
  settings?: MutationSettings<GetEmployeeRequestConfig, typeof getEmployee>,
) =>
  useQuery({
    queryKey: ['getEmployee', params.id],
    queryFn: () => getEmployee({ params, config: settings?.config }),
    ...settings?.options,
  });
