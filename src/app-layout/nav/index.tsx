import { useAppSelector } from '@/store/hooks';
import { navState } from '@/store/slices/nav.slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function Nav() {

    const { activeNavItem } = useAppSelector(navState)

    return (
        <div className='border-l border-white/10 px-8 py-6'>
            {activeNavItem?.sections.map((ctx) => (
                <div key={ctx.section} className='mb-6'>

                    <div className='mb-2 text-xs font-semibold text-gray-500'>
                        {ctx.section}
                    </div>

                    <div className='space-y-1'>
                        {ctx.children.map(({ label, route, icon, disabled }, i) => {
                            return (
                                <NavLink
                                    key={label + i}
                                    to={route}
                                    aria-disabled={disabled}
                                    onClick={(e) => {
                                        if (disabled) e.preventDefault();
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
