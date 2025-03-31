'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/WelcomeEmail';
import { PasswordUpdateEmail } from '@/components/emails/PasswordUpdateEmail';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function createAdminUser(userData: {
  email: string;
  password: string;
  full_name: string;
  role: 'admin' | 'super-admin';
}) {
  try {
    // Create user in Supabase Auth using admin client
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
      });

    if (authError) throw new Error(authError.message);

    // Insert user into users table
    const { data: newUser, error: userError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: userData.email,
          full_name: userData.full_name,
          role: userData.role,
          created_at: new Date().toISOString(),
          is_first_login: true,
        },
      ])
      .select()
      .single();

    if (userError) throw new Error(userError.message);

    // Send welcome email
    await resend.emails.send({
      from: 'iSmart <welcome@theismart.org>',
      to: [userData.email],
      subject: 'Welcome to iSmart Admin Panel',
      react: WelcomeEmail({
        userName: userData.full_name,
        email: userData.email,
        password: userData.password,
      }) as React.ReactElement,
    });

    return { data: newUser, error: null };
  } catch (error: any) {
    console.error('Error creating admin user:', error);
    return { data: null, error: error.message };
  }
}

export async function deleteAdminUser(userId: string) {
  try {
    // Delete user from Supabase Auth using admin client
    const { error: authError } =
      await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) throw new Error(authError.message);

    // Delete from users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId);

    if (userError) throw new Error(userError.message);

    return { error: null };
  } catch (error: any) {
    console.error('Error deleting admin user:', error);
    return { error: error.message };
  }
}

export async function updateAdminUser(
  userId: string,
  userData: {
    full_name?: string;
    reset_password?: boolean;
    new_password?: string;
  }
) {
  try {
    // Get user's email for notification
    const { data: user, error: userFetchError } = await supabaseAdmin
      .from('users')
      .select('email, full_name')
      .eq('id', userId)
      .single();

    if (userFetchError) throw new Error(userFetchError.message);

    // Update user data
    const updateData: any = {};
    if (userData.full_name) updateData.full_name = userData.full_name;

    // Handle password reset if requested
    if (userData.reset_password) {
      // Generate random password if not provided
      const password =
        userData.new_password || Math.random().toString(36).slice(-12);

      // Update password in auth
      const { error: authError } =
        await supabaseAdmin.auth.admin.updateUserById(userId, { password });

      if (authError) throw new Error(authError.message);

      // Update is_first_login in users table
      updateData.is_first_login = true;

      // Send password update email
      await resend.emails.send({
        from: 'iSmart <noreply@theismart.org>',
        to: [user.email],
        subject: 'Your Password Has Been Reset',
        react: PasswordUpdateEmail({
          userName: user.full_name,
          email: user.email,
          password,
        }) as React.ReactElement,
      });
    }

    // Update user in users table
    const { data: updatedUser, error: userError } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (userError) throw new Error(userError.message);

    return { data: updatedUser, error: null };
  } catch (error: any) {
    console.error('Error updating admin user:', error);
    return { data: null, error: error.message };
  }
}
