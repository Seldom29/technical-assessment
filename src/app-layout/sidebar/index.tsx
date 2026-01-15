import { useAppDispatch } from '@/hooks/redux';
import { setActiveNavItem } from '@/store/slices/nav.slice';

import SidebarNav from './sidebar-nav'
import SidebarLogo from './sidebar-logo';
import Logo from '@/assets/images/bravegen_logo.png'
import type { NavItemConfig } from '@/data/nav-items.data';

export default function Sidebar() {

    const dispatch = useAppDispatch();

    const handleSetActiveNavItem = (navItem: NavItemConfig) => {
        dispatch(setActiveNavItem(navItem));
    }

    return (
        <aside className='h-screen flex inset-y-0 grow text-white'>
            <div className='flex w-16 h-full bg-sidebar flex-col items-center py-2'>
                <SidebarLogo src={Logo} alt='BraveGen' />
                <SidebarNav onSelect={handleSetActiveNavItem} />
            </div>
        </aside>
    );
};

