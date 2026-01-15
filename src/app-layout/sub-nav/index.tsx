import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { navState, setActiveNavItem } from '@/store/slices/nav.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import type { NavItemConfig } from '@/data/nav-items.data';

export default function SubNav() {
    const dispatch = useAppDispatch();

    const { pathname } = useLocation();
    const { activeNavItem, navItems } = useAppSelector(navState)

    const handleSetActiveNavItem = (navItem: NavItemConfig) => {
        dispatch(setActiveNavItem(navItem));
    }

    const findContextByRoute = (items: NavItemConfig[], route: string) =>
        items.find((n) =>
            n.children?.some((group) =>
                group.children?.some((child) => child.route === route)
            )
        )?.children;

    const children = useMemo(() => {
        const route = activeNavItem?.route || pathname;
        if (!route) return activeNavItem?.children ?? [];
        return (findContextByRoute(navItems, route) ?? activeNavItem?.children ?? []);
    }, [activeNavItem, navItems, pathname]);

    if (!children.length) {
        return null
    }

    return (
        <div className='w-64 border-l border-white/10 p-6'>
            {children.map((ctx) => (
                <div key={ctx.label} className='mb-6'>

                    <div className='mb-2 text-xs font-semibold text-gray-500'>
                        {ctx.label}
                    </div>

                    <div className='space-y-1'>
                        {ctx.children?.map((navItem, i) => {
                            const { label, route, icon, disabled } = navItem
                            return (
                                <NavLink
                                    key={label + i}
                                    to={route ?? ''}
                                    aria-disabled={disabled}
                                    onClick={(e) => {
                                        if (disabled) e.preventDefault();
                                        handleSetActiveNavItem(navItem)
                                    }}
                                    className={({ isActive }) =>
                                        [
                                            'group flex w-full items-center gap-2 rounded px-3 py-2 text-xs font-semibold transition',
                                            isActive
                                                ? 'bg-brand text-white'
                                                : disabled
                                                    ? 'cursor-not-allowed text-gray-400'
                                                    : 'text-gray-800 hover:text-brand',
                                        ].join(' ')
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {
                                                icon && <>
                                                    <FontAwesomeIcon
                                                        icon={icon}
                                                        className={[
                                                            'text-lg transition-colors',
                                                            isActive
                                                                ? 'text-white'
                                                                : disabled
                                                                    ? 'cursor-not-allowed text-gray-400'
                                                                    : 'text-brand',
                                                        ].join(' ')}
                                                    />
                                                    <span>{label}</span>
                                                </>
                                            }
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>

                </div>
            ))}
        </div>
    );
}
