// middleware.ts
// تأكد أن هذا الملف في الـ root (نفس مكان package.json)

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value;
  const { pathname } = request.nextUrl;

  console.log('🔒 Middleware running');
  console.log('📍 Path:', pathname);
  console.log('🎫 Token exists:', !!token);

  // إذا المستخدم رايح على /auth وعنده token
  if (pathname.startsWith('/auth') && token) {
    console.log('✅ Redirecting to home because user is authenticated');
    return NextResponse.redirect(new URL('/', request.url));
  }

  console.log('➡️ Allowing access');
  return NextResponse.next();
}

export const config = {
  matcher: ['/auth/:path*', '/auth'],
};