import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Safe secret — edge runtime doesn't crash if env is missing
const getSecret = () => {
  const s = process.env.NEXTAUTH_SECRET
  if (!s) return new TextEncoder().encode('fallback-dev-secret-please-set-env')
  return new TextEncoder().encode(s)
}

const PROTECTED_PATHS = ['/dashboard', '/admin']
const AUTH_PATHS      = ['/auth/login', '/auth/signup']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  const isAuth      = AUTH_PATHS.some((p) => pathname.startsWith(p))

  if (!isProtected && !isAuth) return NextResponse.next()

  const token    = req.cookies.get('spc_session')?.value
  let isLoggedIn = false

  if (token) {
    try {
      await jwtVerify(token, getSecret())
      isLoggedIn = true
    } catch {
      isLoggedIn = false
    }
  }

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL('/auth/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  if (isAuth && isLoggedIn) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth/:path*'],
}
