import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from '@/lib/supabase';
import { AdminCreateUserRequest } from '@/lib/types';

// GET handler to fetch all admin users
export async function GET(request: NextRequest) {
  try {
    // Check user authentication/authorization
    // This is a simplified version - you should add proper auth checks

    // Fetch all admin users from the users table
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('role', 'admin')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching admin users' },
      { status: 500 }
    );
  }
}

// POST handler to create a new admin user
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as AdminCreateUserRequest;

    // Validate the request body
    if (!body.email || !body.password || !body.full_name) {
      return NextResponse.json(
        { error: 'Email, password, and full name are required' },
        { status: 400 }
      );
    }

    // Create the user in Supabase Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: body.email,
        password: body.password,
        email_confirm: true, // Auto-confirm the email
      });

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Insert the user into the public users table
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert([
        {
          id: authData.user.id,
          email: body.email,
          full_name: body.full_name,
          role: 'admin',
          is_first_login: true, // Set first login flag
        },
      ])
      .select()
      .single();

    if (userError) {
      // If user table insert fails, delete the auth user
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json(
      { user: userData, message: 'Admin user created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating admin user' },
      { status: 500 }
    );
  }
}
