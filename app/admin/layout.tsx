import { headers } from 'next/headers';
import { Metadata } from 'next';
import AdminSidebar from './components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Admin Panel | iSmart',
  description: 'Admin dashboard for managing the NGO platform',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-16 md:pt-4 md:p-6 lg:p-8 transition-all duration-300 overflow-auto">
        {children}
      </main>
    </div>
  );
}
