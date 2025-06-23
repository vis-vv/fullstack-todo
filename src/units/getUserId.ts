import { ObjectId } from 'mongodb'
import { dbConnect } from '@/shared/lib/mongo/mongobd'

export async function getUserById(id: string) {
    const db = await dbConnect()
    const users = db.collection('users')

    return await users.findOne({ _id: new ObjectId(id) })
}
