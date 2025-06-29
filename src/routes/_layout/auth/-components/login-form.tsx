import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useLogin } from '@/utils/api/hooks/useLogin';

import { zodResolver } from '@hookform/resolvers/zod';
import { setCookie } from '@siberiacancode/reactuse';
import { redirect, useNavigate } from '@tanstack/react-router';
import { LoaderCircleIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import * as z from 'zod';

const formSchema = z.object({
  username: z.string().min(4, {
    message: 'Login must be at least 4 characters',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters',
  }),
});

export const LoginForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const login = useLogin({
    options: {
      onSuccess(data) {
        setCookie('token', data.data.token, {
          path: '/',
        });
        navigate({ to: '/' });
        toast.success('Welcome to employee management');
      },
      onError() {
        toast.error('Invalid login or password');
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate({
      params: values,
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login to account/</CardTitle>
        <CardDescription>
          Enter you login and password below to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Login</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="admin"
                      disabled={login.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="******"
                      type="password"
                      disabled={login.isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={login.isPending}>
              {login.isPending && (
                <LoaderCircleIcon className="size-4 animate-spin" />
              )}
              Continue
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
