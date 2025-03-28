import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UsersClient from './components/UsersClient';

export default async function AdminUsersPage() {
  const supabase = await createServerSupabaseClient();

  // Fetch admin users
  const { data: users, error } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'admin')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Users</h1>
        <p className="text-gray-500">Manage admin users and permissions</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="bg-red-50 p-3 rounded-md text-red-600 mb-4">
              {error.message}
            </div>
          ) : null}

          <UsersClient initialUsers={users || []} />
        </CardContent>
      </Card>
    </div>
  );
}
