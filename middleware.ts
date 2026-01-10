import { auth } from '@/lib/auth/auth';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnAdmin = req.nextUrl.pathname.startsWith('/admin');
  const isOnLogin = req.nextUrl.pathname === '/admin/login';
  const isOnApi = req.nextUrl.pathname.startsWith('/api');

  // Allow API routes
  if (isOnApi) {
    return;
  }

  // Handle admin routes
  if (isOnAdmin) {
    if (isOnLogin) {
      if (isLoggedIn) {
        return Response.redirect(new URL('/admin/dashboard', req.nextUrl));
      }
      return;
    }

    if (!isLoggedIn) {
      return Response.redirect(new URL('/admin/login', req.nextUrl));
    }
  }
});

export const config = {
  matcher: ['/admin/:path*'],
};

