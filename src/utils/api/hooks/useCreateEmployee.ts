import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  CreateEmployeeRequestConfig,
  postCreateEmployee,
} from '../requests/employees/post';
import { toast } from 'sonner';

export const useCreateEmployee = (
  settings?: MutationSettings<
    CreateEmployeeRequestConfig,
    typeof postCreateEmployee
  >,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['createEmployee'],
    mutationFn: async ({ params, config }) =>
      await postCreateEmployee({
        params,
        config: {
          ...settings?.config,
          ...config,
        },
      }),
    onSuccess() {
      toast.success('Employee created successfully');
      queryClient.invalidateQueries({
        queryKey: ['getAllEmployees'],
      });
    },
    ...settings?.options,
  });
};
