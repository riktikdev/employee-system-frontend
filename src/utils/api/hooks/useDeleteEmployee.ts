import { useMutation } from '@tanstack/react-query';
import {
  deleteEmployee,
  DeleteEmployeeRequestConfig,
} from '../requests/employees/delete';
import { toast } from 'sonner';

export const useDeleteEmployee = (
  settings?: MutationSettings<
    DeleteEmployeeRequestConfig,
    typeof deleteEmployee
  >,
) =>
  useMutation({
    mutationKey: ['deleteEmployee'],
    mutationFn: async ({ params, config }) =>
      await deleteEmployee({
        params,
        config: {
          ...settings?.config,
          ...config,
        },
      }),
    onSuccess() {
      toast.success('Employee deleted successfully');
    },
    ...settings?.options,
  });
