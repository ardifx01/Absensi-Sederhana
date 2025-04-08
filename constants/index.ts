import { Icons } from '@/constants/icon';

export interface NavItem {
    title: string;
    url: string;
    disabled?: boolean;
    external?: boolean;
    icon?: keyof typeof Icons;
    label?: string;
    description?: string;
    isActive?: boolean;
    items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
    items?: NavItemWithChildren[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export const navItems: NavItem[] = [
    {
        title: 'Home',
        url: '/',
        icon: 'home',
        isActive: false,
        items: []
    },
    {
        title: 'Data Absensi',
        url: '/dashboard/data_absensi',
        icon: 'dashboard',
        isActive: false,
        items: []
    },
    {
        title: 'Data Siswa',
        url: '/dashboard/data_siswa',
        icon: 'userround',
        isActive: false,
        items: []
    },
];