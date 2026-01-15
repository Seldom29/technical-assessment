import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { navState } from '@/store/slices/nav.slice';
import TenantSwitcher from './tenant-switcher';
import { getAllTenantAsync, setTenant, tenantState } from '@/store/slices/tenant.slice';
import UserProfileDropdown from './user-profile-dropdown';
import {
  faMagnifyingGlass,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';

import {
  faBell,
} from '@fortawesome/free-regular-svg-icons';
import type { Tenant } from '@/data/data.types';

export default function Header() {

  const dispatch = useAppDispatch()

  const { activeNavItem } = useAppSelector(navState)
  const { tenants, tenant } = useAppSelector(tenantState)

  useEffect(() => {
    dispatch(getAllTenantAsync())
  }, [])

  const handleTenantChange = (tenant: Tenant) => {
    dispatch(setTenant(tenant))
  }

  const sortedTenants = useMemo(() => {
    return [...tenants].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
  }, [tenants]);

  return (
    <header className='flex items-center w-full left-64 right-0 top-0 h-16 bg-surface border-b border-border'>

      <div className='flex-none items-center text-xs w-65 px-6 text-gray-600'>
        <TenantSwitcher tenants={sortedTenants} tenant={tenant} onChange={handleTenantChange} />
      </div>

      <div className='flex w-full justify-between items-center gap-'>

        <div className='flex items-center gap-1'>
          {activeNavItem?.icon && <FontAwesomeIcon className='text-lg text-gray-600' icon={activeNavItem.icon} />}
          <div className='font-semibold text-gray-600'>{activeNavItem?.label}</div>
        </div>

        <div className='flex items-center gap-6 px-8'>
          {/* Search */}
          <button
            type='button'
            className='
                      group inline-flex items-center justify-center
                      rounded-full bg-gray-200 p-2
                      transition-all
                      hover:bg-gray-300 hover:shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-brand/30
                      active:scale-95
                      '
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className='text-md text-gray-600 transition-colors group-hover:text-gray-800'
            />
          </button>

          {/* Notifications */}
          <button
            type='button'
            className='
                        group relative inline-flex items-center justify-center
                        rounded-full bg-gray-200 p-2
                        transition-all
                        hover:bg-gray-300 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-brand/30
                        active:scale-95
                      '
          >
            <FontAwesomeIcon
              icon={faBell}
              className='text-lg text-gray-600 transition-colors group-hover:text-gray-800'
            />

            <span
              className='
                          absolute -top-1 -right-0.5
                          flex h-4 min-w-4 items-center justify-center
                          rounded-full bg-red-400
                          px-1 text-[10px] font-semibold text-white
                        '
            >
              3
            </span>
          </button>

          {/* Help */}
          <button
            type='button'
            className='
                        group inline-flex items-center justify-center
                        rounded-full bg-gray-200 p-2
                        transition-all
                        hover:bg-gray-300 hover:shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-brand/30
                        active:scale-95
                      '
          >
            <FontAwesomeIcon
              icon={faQuestion}
              className='text-md text-gray-600 transition-colors group-hover:text-gray-800'
            />
          </button>

          <UserProfileDropdown />
        </div>


      </div>
    </header>
  );
}
