import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Employee } from '@/types/employee';
import { useUpdateEmployee } from '@/utils/api/hooks/useUpdateEmployee';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UpdateEmployeeDialogProps {
  employee: Employee;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  position: z.string().min(1, 'Position is required'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((val) => !isNaN(new Date(val).getTime()), 'Invalid date'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(1, 'Phone is required'),
});

export const UpdateEmployeeDialog = ({
  employee,
  open,
  onOpenChange,
}: UpdateEmployeeDialogProps) => {
  const updateEmployee = useUpdateEmployee({
    id: employee.id,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      position: employee.position,
      dateOfBirth: employee.dateOfBirth.toString(),
      email: employee.email,
      phone: employee.phone,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateEmployee.mutate(
      {
        params: {
          id: employee.id,
          ...data,
        },
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {(
              [
                { name: 'firstName', label: 'First Name', type: 'text' },
                { name: 'lastName', label: 'Last Name', type: 'text' },
                { name: 'position', label: 'Position', type: 'text' },
                { name: 'dateOfBirth', label: 'Date of Birth', type: 'date' },
                { name: 'email', label: 'Email', type: 'email' },
                { name: 'phone', label: 'Phone', type: 'tel' },
              ] as const
            ).map(({ name, label, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type={type}
                        disabled={updateEmployee.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
              <Button type="submit" disabled={updateEmployee.isPending}>
                {updateEmployee.isPending && (
                  <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
                )}
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
