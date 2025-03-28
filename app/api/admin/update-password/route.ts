import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    if (!body.userId || !body.password) {
      return NextResponse.json(
        { error: 'User ID and password are required' },
        { status: 400 }
      );
    }

    // Update the user's password in Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(
      body.userId,
      { password: body.password }
    );

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    // Update the first login flag in the users table
    const { error: userError } = await supabaseAdmin
      .from('users')
      .update({ is_first_login: false })
      .eq('id', body.userId);

    if (userError) {
      return NextResponse.json({ error: userError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Password updated successfully',
    });
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating password' },
      { status: 500 }
    );
  }
}
