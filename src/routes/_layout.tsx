import { createFileRoute, Outlet } from '@tanstack/react-router';

const RootLayout = () => <Outlet />;

export const Route = createFileRoute('/_layout')({
  component: RootLayout,
});
