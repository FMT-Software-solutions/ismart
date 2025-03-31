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
import { createAdminUser, deleteAdminUser, updateAdminUser } from '../actions';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface UsersClientProps {
  initialUsers: User[];
  currentUser: User;
}

export default function UsersClient({
  initialUsers,
  currentUser,
}: UsersClientProps) {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Check if current user is super admin
  const isSuperAdmin = currentUser.role === 'super-admin';

  // Dialog handlers
  const handleCreateUser = async (userData: any) => {
    try {
      setLoading(true);
      const { data: newUser, error } = await createAdminUser({
        ...userData,
        role: 'admin', // Only allow creating admin users
      });

      if (error) throw new Error(error);

      // Update local state
      setUsers((prev) => [...prev, newUser]);
      setCreateDialogOpen(false);

      toast({
        title: 'User added',
        description: 'User has been successfully added',
      });
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

      // Check if user has permission to edit
      if (!isSuperAdmin && selectedUser?.role === 'super-admin') {
        throw new Error('You do not have permission to edit super admin users');
      }

      const { data: updatedUser, error } = await updateAdminUser(userData.id, {
        full_name: userData.full_name,
        reset_password: userData.reset_password,
        new_password: userData.new_password,
      });

      if (error) throw new Error(error);

      // Update local state
      setUsers((prev) =>
        prev.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
      setEditDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: 'User updated',
        description: 'User details has been successfully updated',
      });

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

      // Check if user has permission to delete
      if (!isSuperAdmin) {
        throw new Error('Only super admins can delete users');
      }

      const { error } = await deleteAdminUser(userId);

      if (error) throw new Error(error);

      // Update local state
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      setDeleteDialogOpen(false);
      setSelectedUser(null);
      toast({
        title: 'User deleted',
        description: 'User has been successfully deleted',
      });
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
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
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
                    <Badge
                      variant={
                        user.role === 'super-admin' ? 'destructive' : 'default'
                      }
                    >
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Only show edit button if user has permission */}
                    {(isSuperAdmin || user.role !== 'super-admin') && (
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
                    )}
                    {/* Only show delete button for super admins */}
                    {user.role !== 'super-admin' && isSuperAdmin && (
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
                    )}
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
            currentUser={currentUser}
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
