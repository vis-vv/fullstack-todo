import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { getUserById } from '@/units/getUserId'

const secret = process.env.JWT_SECRET!
const secretKey = new TextEncoder().encode(secret)

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value

        if (!token) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
        }

        const { payload } = await jwtVerify(token, secretKey)
        const userId = payload.sub as string

        const user = await getUserById(userId)

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 })
        }

        return NextResponse.json({ user })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Invalid token or unauthorized' }, { status: 401 })
    }
}
