'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Users,
  Calendar,
  ClipboardList,
  LogOut,
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Menu,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { createClientSupabaseClient } from '@/lib/supabase/client';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientSupabaseClient();

  // Handle responsive collapsing
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Auto-collapse on mobile, but don't force expand on desktop
      // if user has manually collapsed
      if (mobile) {
        setCollapsed(true);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={20} /> },
    { label: 'Admin Users', href: '/admin/users', icon: <Users size={20} /> },
    { label: 'Events', href: '/admin/events', icon: <Calendar size={20} /> },
    {
      label: 'Registrations',
      href: '/admin/events/submissions?eventId=all-events',
      icon: <ClipboardList size={20} />,
    },
  ];

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  };

  const isAuthPage =
    pathname.includes('/admin/login') ||
    pathname.includes('/admin/reset-password');

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      {/* Mobile menu toggle - visible only on mobile screens */}
      {isMobile && (
        <button
          className="fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-md shadow-md md:hidden"
          onClick={() => setCollapsed(!collapsed)}
        >
          <Menu size={20} />
        </button>
      )}

      <div
        className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transition-all duration-300 fixed md:relative h-screen z-40 ${
          collapsed
            ? isMobile
              ? '-translate-x-full md:translate-x-0 md:w-16'
              : 'w-16'
            : 'w-64'
        } ${isMobile && !collapsed ? 'translate-x-0' : ''}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex items-center justify-between border-b">
            {!collapsed && <h2 className="font-bold text-lg">Admin Panel</h2>}
            <button
              className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? (
                <ChevronRight size={20} />
              ) : (
                <ChevronLeft size={20} />
              )}
            </button>
          </div>

          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href} className="list-none">
                  <Link
                    href={item.href}
                    className={`flex items-center p-2 rounded-md transition-colors
                      ${
                        pathname === item.href ||
                        pathname === item.href.split('?')[0]
                          ? 'bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-200'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-800'
                      }
                    `}
                    onClick={() => isMobile && setCollapsed(true)}
                  >
                    <span>{item.icon}</span>
                    {!collapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center p-2 w-full rounded-md hover:bg-gray-100 transition-colors"
            >
              <LogOut size={20} />
              {!collapsed && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile - close sidebar when clicking outside */}
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setCollapsed(true)}
        />
      )}
    </>
  );
};

export default AdminSidebar;
