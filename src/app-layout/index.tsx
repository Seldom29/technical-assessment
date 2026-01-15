import { Outlet } from 'react-router-dom';

import Header from './header'
import SubNav from './sub-nav'
import Sidebar from './sidebar'

export default function AppLayout() {
  return (
    <div className='min-h-screen flex bg-page'>
      <Sidebar />

      <div className='flex flex-col w-full'>
        <Header />

        <div className='flex flex-1 min-h-0'>
          <SubNav/>

          <main className='flex-1 p-6 overflow-y-auto min-w-0'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
