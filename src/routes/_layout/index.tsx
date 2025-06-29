import { createFileRoute, redirect } from '@tanstack/react-router';

import { isAuthenticated } from '@/utils/auth';

export const Route = createFileRoute('/_layout/')({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: '/auth/login',
        from: '/users',
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <img
      className="max-h-screen min-h-screen object-center"
      src="/zelensky.jpg"
    />
  );
}
