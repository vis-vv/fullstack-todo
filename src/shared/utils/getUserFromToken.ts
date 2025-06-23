import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { ObjectId } from 'mongodb'
import { dbConnect } from '@/shared/lib/mongo/mongobd'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)

export async function getUserFromToken() {
    try {
        const cookieStore = await cookies()

        const token = cookieStore.get('token')?.value
        if (!token) return null

        const { payload } = await jwtVerify(token, secret)
        const db = await dbConnect()
        const users = db.collection('users')

        return await users.findOne({ _id: new ObjectId(payload.sub as string) })
    } catch (e) {
        console.error('Token verification error', e)
        return null
    }
}
