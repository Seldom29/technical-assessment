import Logo from '@/assets/images/logo.png'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { navState, setActiveNavItem } from '@/store/slices/nav.slice';

import SidebarNav, { type NavItemConfig } from './sidebar-nav'
import SidebarLogo from './sidebar-logo';

export default function Sidebar() {

    const dispatch = useAppDispatch();
    const { navItems, activeNavItem: activeNavITem } = useAppSelector(navState)

    const handleSetActiveNavItem = (navItem: NavItemConfig) => {
        dispatch(setActiveNavItem(navItem));
    }

    return (
        <aside className='h-full flex inset-y-0 grow text-white'>
            <div className='flex w-16 h-full bg-sidebar flex-col items-center py-2'>
                <SidebarLogo src={Logo} alt='BraveGen' />
                <SidebarNav navItems={navItems} activeNavItem={activeNavITem} onSelect={handleSetActiveNavItem} />
            </div>
        </aside>
    );
};

