import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/auth';
import { LoginForm } from './-components/login-form';

export const Route = createFileRoute('/_layout/auth/login')({
  beforeLoad: () => {
    if (isAuthenticated()) {
      throw redirect({
        to: '/',
        from: '/auth/login',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
