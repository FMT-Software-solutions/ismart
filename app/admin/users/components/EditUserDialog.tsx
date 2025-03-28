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

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (userData: AdminUpdateUserRequest) => Promise<{ error?: string }>;
  user: User;
}

export default function EditUserDialog({
  open,
  onOpenChange,
  onSubmit,
  user,
}: EditUserDialogProps) {
  const [formData, setFormData] = useState<AdminUpdateUserRequest>({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    is_first_login: user.is_first_login,
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Reset form data when user changes
  useEffect(() => {
    setFormData({
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      is_first_login: user.is_first_login,
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, is_first_login: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await onSubmit(formData);

      if (result?.error) {
        setError(result.error);
        return;
      }
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
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="first_login">Require Password Reset</Label>
              <Switch
                id="first_login"
                checked={formData.is_first_login}
                onCheckedChange={handleSwitchChange}
              />
            </div>
            <p className="text-xs text-gray-500">
              When enabled, the user will be required to set a new password on
              next login.
            </p>
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
