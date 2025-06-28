import type { NavGroupProps } from '@/types/sidebar';

import { HouseIcon, UsersIcon } from 'lucide-react';

export const sidebarData: NavGroupProps[] = [
  {
    title: 'Основное',
    items: [
      {
        title: 'Главная',
        url: '/',
        icon: HouseIcon,
      },
      {
        title: 'Пользователи',
        url: '/users',
        icon: UsersIcon,
      },
    ],
  },
];
