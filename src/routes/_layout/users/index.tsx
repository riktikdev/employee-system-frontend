import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/auth';
import { DataTable } from './-components/table';
import { columns } from './-components/columns';
import { useGetAllEmployees } from '@/utils/api/hooks/useGetAllEmployees';

export const Route = createFileRoute('/_layout/users/')({
  // beforeLoad: () => {
  //   if (!isAuthenticated()) {
  //     throw redirect({
  //       to: '/auth/login',
  //       from: '/users',
  //     });
  //   }
  // },
  component: RouteComponent,
});

function RouteComponent() {
  const getAllEmployees = useGetAllEmployees();

  return (
    <div className="container grid flex-1 gap-4 p-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <DataTable columns={columns} data={getAllEmployees.data?.data ?? []} />
      </div>
    </div>
  );
}
