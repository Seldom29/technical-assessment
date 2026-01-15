import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarNavItem from './sidebar-nav-item';
import type { NavItemConfig } from '@/data/nav-items.data';
import { useAppSelector } from '@/store/hooks';
import { navState } from '@/store/slices/nav.slice';

type SidebarNavProps = {
    onSelect: (navItem: NavItemConfig) => void;
};

export default function SidebarNav({
    onSelect,
}: SidebarNavProps) {
    const { pathname } = useLocation();
    const { navItems, activeNavItem } = useAppSelector(navState)

    const mainItems = navItems.filter((i) => i.position !== 'footer');
    const footerItems = navItems.filter((i) => i.position === 'footer');

    const isActive = useCallback((navItem: NavItemConfig) => {
        const route = activeNavItem?.route || pathname
        return navItem.route === route || navItem.children?.some(n => n.children?.some(c => c.route === route))
    }, [activeNavItem?.route])

    const handleNavItemClick = useCallback((navItem: NavItemConfig) => () => {
        onSelect(navItem)
    }, [onSelect])

    return (
        <>
            {/* Main section */}
            <div className='flex flex-1 flex-col justify-center'>
                <nav className='flex flex-col items-center gap-5'>
                    {mainItems.map((item) => (
                        <SidebarNavItem
                            key={item.label}
                            icon={item.icon}
                            label={item.label}
                            route={item.route}
                            active={isActive(item)}
                            onClick={handleNavItemClick(item)}
                        />
                    ))}
                </nav>
            </div>

            {/* Footer section */}
            <div className='py-4'>
                {footerItems.map((item) => (
                    <SidebarNavItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        active={isActive(item)}
                        onClick={handleNavItemClick(item)}
                    />
                ))}
            </div>
        </>
    );
}
