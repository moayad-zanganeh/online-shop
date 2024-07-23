import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/auth')) {
    if (
      request.cookies.get('access Token') &&
      request.cookies.get('role')?.value === 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    if (!request.cookies.get('accessToken')) {
      return NextResponse.redirect(new URL('/auth', request.url));
    } else if (
      request.cookies.get('accessToken') &&
      request.cookies.get('role')?.value !== 'ADMIN'
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
}

export const config = {
  matcher: ['/admin/:path*', '/auth'],
};
