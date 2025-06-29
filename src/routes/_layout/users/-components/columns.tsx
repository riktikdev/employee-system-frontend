import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Employee } from '@/types/employee';
import { useDeleteEmployee } from '@/utils/api/hooks/useDeleteEmployee';
import { useGetEmployee } from '@/utils/api/hooks/useGetEmployee';
import { DialogContent } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { GetEmployeeDialog } from './dialogs/get-employee-dialog';
import { useState } from 'react';
import { UpdateEmployeeDialog } from './dialogs/update-employee-dialog';

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'firstName',
    header: 'First name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last name',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'dateOfBirth',
    header: 'Date of Birth',
    cell: ({ row }) => {
      const date = new Date(row.getValue('dateOfBirth'));
      return date.toLocaleDateString();
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone',
    header: 'Phone',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const employee = row.original;

      const deleteEmployee = useDeleteEmployee();

      const [editorOpened, setEditorOpened] = useState(false);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="size-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setEditorOpened(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  deleteEmployee.mutate({
                    params: {
                      id: employee.id,
                    },
                  })
                }
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UpdateEmployeeDialog
            employee={employee}
            open={editorOpened}
            onOpenChange={setEditorOpened}
          />
        </>
      );
    },
  },
];
