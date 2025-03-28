import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Check if we're on an admin page (excluding login page)
  const adminPathRegex = /^\/admin(?!\/login)/;
  if (adminPathRegex.test(request.nextUrl.pathname)) {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        // Redirect to login if not authenticated
        const redirectUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Check if first login and redirect to reset password if needed
      try {
        const { data: userData } = await supabase
          .from('users')
          .select('is_first_login')
          .eq('id', user.id)
          .single();

        if (
          userData?.is_first_login &&
          request.nextUrl.pathname !== '/admin/reset-password'
        ) {
          const redirectUrl = new URL('/admin/reset-password', request.url);
          return NextResponse.redirect(redirectUrl);
        }
      } catch (error) {
        console.error('Error checking first login status:', error);
      }
    } catch (error) {
      console.error('Error in auth middleware:', error);
      // On error, redirect to login as a fallback
      const redirectUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  } else if (request.nextUrl.pathname === '/admin/login') {
    try {
      // Check if user is already logged in
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // If already logged in, redirect to admin dashboard
        const redirectUrl = new URL('/admin', request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
