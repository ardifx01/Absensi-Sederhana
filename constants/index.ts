import { Icons } from '@/constants/icon';
import { LucideIcon, PersonStanding, NotepadText } from 'lucide-react'

export type onboardingitemProps = {
    icon: LucideIcon;
    title: string;
    description: string;
    linkHref: string;
}

export const onboardingitem: onboardingitemProps[] = [
    {
        icon: PersonStanding,
        title: "Warga",
        description: "Buat profile Warga Anda.",
        linkHref: "/profile/warga/new"
    },
    {
        icon: NotepadText,
        title: "Registrasi",
        description: "Buat profile Registrasi Anda.",
        linkHref: "/profile/register/new"
    }
]

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
        title: 'Administrator',
        url: '/dashboard/administrator',
        icon: 'dashboard',
        isActive: false,
        items: []
    },
];