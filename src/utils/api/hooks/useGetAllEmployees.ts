import { useQuery } from '@tanstack/react-query';
import { getAllEmployees } from '../requests/employees/get';

export const useGetAllEmployees = (
  settings?: QuerySettings<typeof getAllEmployees>,
) =>
  useQuery({
    queryKey: ['getAllEmployees'],
    queryFn: () => getAllEmployees(),
    ...settings?.options,
  });
