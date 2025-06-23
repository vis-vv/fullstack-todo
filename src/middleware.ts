import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_PATHS = ['/login', '/register']
const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const token = request.cookies.get('token')?.value

    let isTokenValid = false
    if (token) {
        try {
            await jwtVerify(token, secretKey)
            isTokenValid = true
        } catch {
            isTokenValid = false
        }
    }

    const isPublicPath = PUBLIC_PATHS.some((path) => pathname.startsWith(path))

    if (isTokenValid && isPublicPath) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!isTokenValid && !isPublicPath) {
        const response = NextResponse.redirect(new URL('/login', request.url))
        if (token) {
            response.cookies.delete('token')
        }
        return response
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
