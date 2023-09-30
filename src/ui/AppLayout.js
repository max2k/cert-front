import { Outlet } from 'react-router-dom';
import Header from './Header';
import ErrorBanner from './ErrorBanner';

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] bg-stone-400">
      <Header />

      <main className="mx-32">
        <ErrorBanner />
        <Outlet />
      </main>

      <div className="h-10 bg-stone-700"></div>
    </div>
  );
}

export default AppLayout;
