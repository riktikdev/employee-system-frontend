import { useMutation } from '@tanstack/react-query';
import {
  updateEmployee,
  UpdateEmployeeParams,
  UpdateEmployeeRequestConfig,
} from '../requests/employees/put';

export const useUpdateEmployee = (
  params: UpdateEmployeeParams,
  settings?: MutationSettings<
    UpdateEmployeeRequestConfig,
    typeof updateEmployee
  >,
) =>
  useMutation({
    mutationKey: ['updateEmployee', params.id],
    mutationFn: ({ params, config }) =>
      updateEmployee({
        params,
        config: {
          ...settings?.config,
          ...config,
        },
      }),
    ...settings?.options,
  });
