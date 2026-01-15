import { useCallback } from 'react';
import SidebarNavItem from './sidebar-nav-item';

import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export type SidebarNavItemName =
    | 'Insights'
    | 'Collect'
    | 'Reviews'
    | 'Carbon'
    | 'Utilities'
    | 'Reports'
    | 'Actions'
    | 'Settings';


export type NavSectionItem = {
    label: string;
    route: string;
    icon?: any;
    disabled?: boolean;
};

export type NavSection = {
    section: string;
    children: NavSectionItem[];
};

export type SidebarNavItemConfig = {
    section: SidebarNavItemName;
    icon: IconDefinition;
    active?: boolean;
    route?: string;
    position?: 'main' | 'footer';
    sections: NavSection[]
};

type SidebarNavProps = {
    navItems: SidebarNavItemConfig[]
    activeNavItem: SidebarNavItemConfig | null;
    onSelect: (navItem: SidebarNavItemConfig) => void;
};

export default function SidebarNav({
    navItems,
    activeNavItem,
    onSelect,
}: SidebarNavProps) {
    const mainItems = navItems.filter((i) => i.position !== 'footer');
    const footerItems = navItems.filter((i) => i.position === 'footer');

    const isActive = useCallback((name: SidebarNavItemName) => {
        return name === activeNavItem?.section
    }, [activeNavItem?.section])

    const handleNavItemClick = useCallback((navItem: SidebarNavItemConfig) => () => {
        onSelect(navItem)
    }, [onSelect])

    return (
        <>
            {/* Main section */}
            <div className='flex flex-1 flex-col justify-center'>
                <nav className='flex flex-col items-center gap-5'>
                    {mainItems.map((item) => (
                        <SidebarNavItem
                            key={item.section}
                            icon={item.icon}
                            label={item.section}
                            route={item.route}
                            active={isActive(item.section)}
                            onClick={handleNavItemClick(item)}
                        />
                    ))}
                </nav>
            </div>

            {/* Footer section */}
            <div>
                {footerItems.map((item) => (
                    <SidebarNavItem
                        key={item.section}
                        icon={item.icon}
                        label={item.section}
                        active={isActive(item.section)}
                        onClick={handleNavItemClick(item)}
                    />
                ))}
            </div>
        </>
    );
}
