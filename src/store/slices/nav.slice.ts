import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { NavItemConfig } from '../../app-layout/sidebar/sidebar-nav';
import { navItems } from '../../data/nav-items.data';
import type { RootState } from '..';

export type NavState = {
    activeNavItem: NavItemConfig | null;
    navItems: NavItemConfig[];
};

const initialState: NavState = {
    activeNavItem: null,
    navItems: navItems,
};

export const navState = (state: RootState) => state.nav;

const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setActiveNavItem(
            state,
            action: PayloadAction<NavItemConfig>
        ) {
            state.activeNavItem = action.payload;
        },
    },
});

export const { setActiveNavItem } = navSlice.actions;
export default navSlice.reducer;
