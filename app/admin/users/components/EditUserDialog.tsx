'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AdminUpdateUserRequest, User } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (userData: AdminUpdateUserRequest) => Promise<{ error?: string }>;
  user: User;
  currentUser: User;
}

export default function EditUserDialog({
  open,
  onOpenChange,
  onSubmit,
  user,
  currentUser,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<AdminUpdateUserRequest>({
    id: user.id,
    full_name: user.full_name,
  });
  const [resetPassword, setResetPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Check if current user is super admin
  const isSuperAdmin = currentUser.role === 'super-admin';

  // Reset form data when user changes
  useEffect(() => {
    setFormData({
      id: user.id,
      full_name: user.full_name,
    });
    setResetPassword(false);
    setNewPassword('');
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Add password reset data if enabled
      const submitData = {
        ...formData,
        ...(resetPassword && {
          reset_password: true,
          new_password: newPassword || undefined, // Only include if provided
        }),
      };

      const result = await onSubmit(submitData);

      if (result?.error) {
        setError(result.error);
        return;
      }

      // Close dialog on success
      onOpenChange(false);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Update user information and settings.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={user.email}
                className="bg-gray-50 dark:bg-gray-800"
                disabled
              />
              <p className="text-xs text-gray-500">
                Email cannot be changed for security reasons.
              </p>
            </div>

            {isSuperAdmin && (
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reset_password">Reset Password</Label>
                  <Switch
                    id="reset_password"
                    checked={resetPassword}
                    onCheckedChange={setResetPassword}
                  />
                </div>

                {resetPassword && (
                  <div className="space-y-2">
                    <Label htmlFor="new_password">
                      New Password (Optional)
                    </Label>
                    <Input
                      id="new_password"
                      name="new_password"
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Leave blank to generate random password"
                      className="font-mono"
                    />
                    <p className="text-xs text-gray-500">
                      If left blank, a secure random password will be generated.
                      The user will receive their new password via email.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <DialogFooter className="mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
