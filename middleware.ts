import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;
  const { pathname } = new URL(req.url);

  // Define protected routes that require authentication
  const protectedRoutes = [
    '/',
    '/job',
    '/dashboard'
  ];

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname === route || pathname.startsWith(route + '/')
  );

  // If user is authenticated and trying to access login page, redirect to dashboard
  if (isAuth && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!isAuth && isProtectedRoute) {
    const loginUrl = new URL('/login', req.url);
    // Add the original URL as a callback parameter
    loginUrl.searchParams.set('callbackUrl', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.webp$).*)'],
};
