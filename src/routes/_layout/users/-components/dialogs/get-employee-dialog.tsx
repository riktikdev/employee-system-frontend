import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useGetEmployee } from '@/utils/api/hooks/useGetEmployee';
import { MoreHorizontal } from 'lucide-react';

interface GetEmployeeDialogProps {
  employeeId: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const GetEmployeeDialog = ({
  employeeId,
  open,
  onOpenChange,
}: GetEmployeeDialogProps) => {
  const employee = useGetEmployee({
    id: employeeId,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Employee Details</DialogTitle>
          <DialogDescription>
            {employee.isLoading && 'Loading employee information...'}
            {employee.isError && 'Failed to load employee data.'}
          </DialogDescription>
        </DialogHeader>

        {!employee.isLoading && employee.data && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <span className="font-semibold">Name:</span>
              <span>
                {employee.data.data.firstName} {employee.data.data.lastName}
              </span>

              <span className="font-semibold">Position:</span>
              <span>{employee.data.data.position}</span>

              <span className="font-semibold">Date of Birth:</span>
              <span>
                {new Date(employee.data.data.dateOfBirth).toLocaleDateString()}
              </span>

              <span className="font-semibold">Email:</span>
              <span>{employee.data.data.email}</span>

              <span className="font-semibold">Phone:</span>
              <span>{employee.data.data.phone}</span>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
