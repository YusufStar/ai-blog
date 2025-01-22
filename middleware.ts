import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from '@/lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const pathname = request.nextUrl.pathname

  // Public routes
  const publicRoutes = ['/', '/login', '/register']
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // API routes that don't need auth
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Check auth
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await verifyAuth(token)
    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
} 