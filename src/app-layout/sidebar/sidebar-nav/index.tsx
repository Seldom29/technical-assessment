import { useCallback } from 'react';
import SidebarNavItem from './sidebar-nav-item';
import type { NavItemConfig } from '@/data/nav-items.data';

type SidebarNavProps = {
    navItems: NavItemConfig[]
    activeNavItem: NavItemConfig | null;
    onSelect: (navItem: NavItemConfig) => void;
};

export default function SidebarNav({
    navItems,
    activeNavItem,
    onSelect,
}: SidebarNavProps) {
    const mainItems = navItems.filter((i) => i.position !== 'footer');
    const footerItems = navItems.filter((i) => i.position === 'footer');

    const isActive = useCallback((navItem: NavItemConfig) => {
        return navItem.route === activeNavItem?.route ||
            navItem.children?.some(n => n.children?.some(c => c.route === activeNavItem?.route))
    }, [activeNavItem?.label])

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
