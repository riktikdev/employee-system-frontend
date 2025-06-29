import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_layout/secret/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <img
      className="max-h-screen min-h-screen object-center"
      src="/zelensky-2.webp"
    />
  );
}
