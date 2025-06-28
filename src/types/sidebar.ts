import type { LinkProps } from '@tanstack/react-router';

interface BaseNavItem {
  badge?: string;
  icon?: React.ElementType;
  title: string;
}

type NavLink = BaseNavItem & {
  url: LinkProps['to'];
  items?: never;
};

type NavCollapsible = BaseNavItem & {
  items: (BaseNavItem & { url: LinkProps['to'] })[];
  url?: never;
};

type NavItem = NavCollapsible | NavLink;

interface NavGroupProps {
  items: NavItem[];
  title: string;
}

export type { NavCollapsible, NavGroupProps, NavItem, NavLink };
