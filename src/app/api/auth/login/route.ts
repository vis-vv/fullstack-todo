'use server'

import { NextResponse } from 'next/server'
import { dbConnect } from '@/shared/lib/mongo/mongobd'

import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        const bd = await dbConnect()
        const users = bd.collection('users')

        const user = await users.findOne({ email })

        if (!user) {
            return NextResponse.json(
                { ok: false, message: 'Пользователь не найден' },
                { status: 400 }
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword)
        if (!isPasswordValid) {
            return NextResponse.json({ ok: false, message: 'Неверный пароль' }, { status: 401 })
        }

        const token = await new SignJWT({ sub: user._id.toString(), email: user.email })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(secretKey)

        const response = NextResponse.json({ ok: true, message: 'Logged in' })
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        })

        return response
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, message: 'Internal server error' }, { status: 500 })
    }
}
