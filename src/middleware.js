import { NextResponse } from 'next/server'

const protectedRoutes = ['/']

export function middleware(request) {
  const { cookies, nextUrl } = request
  const jwtToken = cookies.get('jwt')?.value

  if (!jwtToken && protectedRoutes.includes(nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (jwtToken && nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', ...protectedRoutes]
}