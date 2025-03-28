'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { User } from '@/lib/types';
import CreateUserDialog from './CreateUserDialog';
import EditUserDialog from './EditUserDialog';
import DeleteUserDialog from './DeleteUserDialog';
import { createClientSupabaseClient } from '@/lib/supabase/client';

interface UsersClientProps {
  initialUsers: User[];
}

export default function UsersClient({ initialUsers }: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const supabase = createClientSupabaseClient();

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Dialog handlers
  const handleCreateUser = async (userData: any) => {
    try {
      setLoading(true);

      // Create user in Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: userData.email,
          password: userData.password,
          email_confirm: true,
        });

      if (authError) throw new Error(authError.message);

      // Insert user into users table
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user.id,
            email: userData.email,
            full_name: userData.full_name,
            role: 'admin',
            is_first_login: true,
          },
        ])
        .select()
        .single();

      if (userError) throw new Error(userError.message);

      // Update local state
      setUsers((prev) => [...prev, newUser]);
      setCreateDialogOpen(false);
      return {};
    } catch (err: any) {
      console.error('Error creating user:', err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = async (userData: any) => {
    try {
      setLoading(true);

      // Prepare update data
      const updateData: any = {};
      if (userData.full_name) updateData.full_name = userData.full_name;
      if (typeof userData.is_first_login === 'boolean')
        updateData.is_first_login = userData.is_first_login;

      // Update user in users table
      const { data: updatedUser, error: userError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userData.id)
        .select()
        .single();

      if (userError) throw new Error(userError.message);

      // If email is changing, update in auth
      if (userData.email && userData.email !== updatedUser.email) {
        const { error: authError } = await supabase.auth.admin.updateUserById(
          userData.id,
          { email: userData.email }
        );

        if (authError) throw new Error(authError.message);

        // Update email in users table
        await supabase
          .from('users')
          .update({ email: userData.email })
          .eq('id', userData.id);

        updatedUser.email = userData.email;
      }

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditDialogOpen(false);
      setSelectedUser(null);
      return {};
    } catch (err: any) {
      console.error('Error updating user:', err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setLoading(true);

      // Delete user from Supabase Auth
      const { error: authError } = await supabase.auth.admin.deleteUser(userId);

      if (authError) throw new Error(authError.message);

      // Delete from users table
      const { error: userError } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (userError) throw new Error(userError.message);

      // Update local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      return {};
    } catch (err: any) {
      console.error('Error deleting user:', err);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="sm:w-auto w-full"
          disabled={loading}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          {searchTerm ? 'No users match your search' : 'No admin users found'}
        </div>
      ) : (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>First Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.full_name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.is_first_login ? (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                        Pending
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                        Completed
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedUser(user);
                        setEditDialogOpen(true);
                      }}
                      disabled={loading}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => {
                        setSelectedUser(user);
                        setDeleteDialogOpen(true);
                      }}
                      disabled={loading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialogs */}
      <CreateUserDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateUser}
      />

      {selectedUser && (
        <>
          <EditUserDialog
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onSubmit={handleEditUser}
            user={selectedUser}
          />

          <DeleteUserDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onDelete={() => handleDeleteUser(selectedUser.id)}
            user={selectedUser}
          />
        </>
      )}
    </>
  );
}
