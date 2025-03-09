import { Outlet, NavLink, Link } from 'react-router-dom';
import { 
  HomeIcon, 
  LinkIcon, 
  ChartBarIcon, 
  PlusIcon,
  ArrowRightOnRectangleIcon as LogoutIcon 
} from '@heroicons/react/24/outline';

export const MainLayout = () => {
  const navItems = [
    { name: 'Home', to: '/dashboard', icon: HomeIcon },
    { name: 'Create new', to: '/create', icon: PlusIcon },
    { name: 'Logout', to: '/logout', icon: LogoutIcon },
  ];

  return (
    <div className="flex w-screen h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900">
        <div className="flex h-16 items-center px-6">
          <Link to="/" className="text-xl font-bold text-white">URL Shortener</Link>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) => `
                flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white
                ${isActive ? 'bg-gray-800 text-white' : ''}
              `}
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}; 