import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { SidebarNavItemConfig } from '../../app-layout/sidebar/sidebar-nav';
import { navItems } from '../../data/nav-items.data';
import type { RootState } from '..';

export type NavState = {
    activeNavItem: SidebarNavItemConfig | null;
    navItems: SidebarNavItemConfig[];
};

const initialState: NavState = {
    activeNavItem: navItems.find(n => n.section === 'Settings') || null,
    navItems: navItems,
};

export const navState = (state: RootState) => state.nav;

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setActiveNavItem(
            state,
            action: PayloadAction<SidebarNavItemConfig>
        ) {
            state.activeNavItem = action.payload;
        },
    },
});

export const { setActiveNavItem } = navSlice.actions;
export default navSlice.reducer;
