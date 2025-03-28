import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, Calendar, ClipboardList } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // Get current user
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Get user details
  const { data: userData } = await supabase
    .from('users')
    .select('*')
    .eq('id', session?.user.id)
    .single();

  // Get counts for dashboard
  const { count: userCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'admin');

  const { count: eventCount } = await supabase
    .from('events')
    .select('*', { count: 'exact', head: true });

  const { count: registrationCount } = await supabase
    .from('registrations')
    .select('*', { count: 'exact', head: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500">Welcome back, {userData?.full_name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/users">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount || 0}</div>
              <p className="text-xs text-gray-500">
                Add, edit, and remove admin users
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/events">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{eventCount || 0}</div>
              <p className="text-xs text-gray-500">
                Create and manage your events
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/registrations">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Registrations
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{registrationCount || 0}</div>
              <p className="text-xs text-gray-500">
                Track and manage event registrations
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              An overview of recent activities in the system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              Activity data will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
