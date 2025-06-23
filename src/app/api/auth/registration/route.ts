import { dbConnect } from '@/shared/lib/mongo/mongobd'
import { NextResponse } from 'next/server'

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()

        const bd = await dbConnect()
        const users = bd.collection('users')

        const existingUser = await users.findOne({ email })
        if (existingUser) {
            return NextResponse.json(
                { ok: false, message: 'Пользователь уже существует' },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await users.insertOne({ email, hashedPassword })

        const token = jwt.sign({ id: result.insertedId, email }, SECRET_KEY, { expiresIn: '1h' })
        const response = NextResponse.json({ ok: true })
        response.cookies.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600,
            path: '/',
        })

        return response
    } catch (error) {
        console.error(error)
        return NextResponse.json({ ok: false, message: 'Internal server error' }, { status: 500 })
    }
}
