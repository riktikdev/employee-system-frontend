import type { ComponentProps } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from '@/components/ui/sidebar';

import { sidebarData } from '@/constants/sidebar';

import { NavGroup } from './nav-group';
import { LogOutIcon } from 'lucide-react';
import { useLogout } from '@/utils/api/hooks/useLogout';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { isAuthenticated } from '@/utils/auth';

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  const navigate = useNavigate();

  const logout = useLogout({
    options: {
      onSuccess() {
        toast.success('Successful logout');
        navigate({ to: '/auth/login' });
      },
      onError() {
        toast.error('Unable to logout. See console for details.');
      },
    },
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {isAuthenticated() && (
          <Button
            className="w-full"
            variant="outline"
            onClick={() => logout.mutate({})}
            disabled={logout.isPending}
          >
            <LogOutIcon className="size-4" />
            Logout
          </Button>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
