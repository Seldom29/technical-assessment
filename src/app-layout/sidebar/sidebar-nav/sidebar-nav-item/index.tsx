import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export type SidebarNavItemProps = {
    icon: any;
    label: string;
    active?: boolean;
    route?: string,
    onClick?: () => void;
};


export default function SidebarNavItem({
    icon,
    label,
    active = false,
    route,
    onClick,
}: SidebarNavItemProps) {

    const baseClasses = [
        "group flex flex-col items-center gap-1 text-xs transition",
        active
            ? "text-brand/90"
            : "text-white/80 hover:text-brand",
    ].join(" ");

    const iconClasses = [
        "text-lg transition-colors",
        active
            ? "text-brand/90"
            : "text-white/80 group-hover:text-brand",
    ].join(" ");

    if (route) {
        return (
            <NavLink
                to={route}
                title={label}
                aria-label={label}
                onClick={onClick}
                className={({ isActive }) =>
                    [
                        baseClasses,
                        isActive ? "text-brand/90" : "",
                    ].join(" ")
                }
            >
                <FontAwesomeIcon icon={icon} className={iconClasses} />
                <span>{label}</span>
            </NavLink>
        );
    }

    return (
        <button
            type="button"
            title={label}
            aria-label={label}
            onClick={onClick}
            className={baseClasses}
        >
            <FontAwesomeIcon icon={icon} className={iconClasses} />
            <span>{label}</span>
        </button>
    );
}