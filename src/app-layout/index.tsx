import { Outlet } from 'react-router-dom';

import Header from './header'
import SubNav from './sub-nav'
import Sidebar from './sidebar'
import { useRouteDocumentTitle } from '@/hooks/document-title';

export default function AppLayout() {

  useRouteDocumentTitle()
  return (
    <div className='min-h-screen flex bg-page overflow-hidden'>
      <Sidebar />

      <div className='flex flex-col h-screen w-full overflow-hidden'>
        <Header />

        <div className='flex flex-1 min-h-0 overflow-hidden'>
          <SubNav />

          <main className='flex-1 min-h-0 p-6 overflow-y-auto'>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

