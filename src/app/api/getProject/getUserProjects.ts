import { dbConnect } from '@/shared/lib/mongo/mongobd'

import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

export async function getUserProjects() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('token')?.value

        if (!token) return []

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { sub: string }

        const db = await dbConnect()
        const collection = db.collection('projects')

        const userId = new ObjectId(decoded.sub)

        const projectsFromDb = await collection
            .find({
                $or: [{ ownerId: userId }, { members: userId }],
            })
            .toArray()

        return projectsFromDb.map((project) => {
            return {
                ...project,
                title: project.title.toString(),
                description: project.description.toString(),
                date: project.date.toString(),
                teamMembers: project.teamMembers.toString(),
                icon: project.icon ?? { name: '', color: '' },
                _id: project._id.toString(),
                ownerId: project.ownerId.toString(),
                members: project.members.map((id: ObjectId) => id.toString()),
                createdAt: project.createdAt.toISOString(),
                invites: project.invites.map((id: ObjectId) => id.toString()),
            }
        })
    } catch (error) {
        console.error(error)
        return []
    }
}
