import { dbConnect } from '@/shared/lib/mongo/mongobd'
import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '@/shared/utils/getUserFromToken'

export async function POST(req: NextRequest) {
    try {
        const user = await getUserFromToken()
        if (!user) return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })

        const { title, description, icon, teamMembers, date } = await req.json()
        const db = await dbConnect()
        const projects = db.collection('projects')

        const newProject = {
            title,
            description,
            icon,
            teamMembers,
            date,
            ownerId: user._id,
            members: [user._id],
            createdAt: new Date(),
            invites: [],
        }

        const result = await projects.insertOne(newProject)
        return NextResponse.json({ ok: true, projectId: result.insertedId })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
    }
}
