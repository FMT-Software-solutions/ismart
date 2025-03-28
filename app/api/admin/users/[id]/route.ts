import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from '@/lib/supabase';
import { AdminUpdateUserRequest } from '@/lib/types';

// GET handler to fetch a specific admin user
export async function GET(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    // Fetch user from the users table
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .eq('role', 'admin')
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the admin user' },
      { status: 500 }
    );
  }
}

// PUT handler to update an admin user
export async function PUT(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;
    const body = (await request.json()) as AdminUpdateUserRequest;

    if (id !== body.id) {
      return NextResponse.json({ error: 'User ID mismatch' }, { status: 400 });
    }

    // Prepare the update data
    const updateData: Record<string, any> = {};

    if (body.full_name) updateData.full_name = body.full_name;
    if (typeof body.is_first_login === 'boolean')
      updateData.is_first_login = body.is_first_login;

    // Update the user in the users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .update(updateData)
      .eq('id', id)
      .eq('role', 'admin')
      .select()
      .single();

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    // If email is being updated, also update in Supabase Auth
    if (body.email && body.email !== userData.email) {
      const { error: authError } =
        await supabaseAdmin.auth.admin.updateUserById(id, {
          email: body.email,
        });

      if (authError) {
        return NextResponse.json({ error: authError.message }, { status: 500 });
      }

      // Update email in users table too
      await supabaseAdmin
        .from('users')
        .update({ email: body.email })
        .eq('id', id);

      userData.email = body.email;
    }

    return NextResponse.json({
      user: userData,
      message: 'Admin user updated successfully',
    });
  } catch (error) {
    console.error('Error updating admin user:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the admin user' },
      { status: 500 }
    );
  }
}

// DELETE handler to remove an admin user
export async function DELETE(request: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const { id } = params;

    // Delete the user from Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Delete the user from the users table
    // Note: This might be handled by Supabase RLS/triggers if configured
    const { error: userError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id)
      .eq('role', 'admin');

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Admin user deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { error: 'An error occurred while deleting the admin user' },
      { status: 500 }
    );
  }
}
