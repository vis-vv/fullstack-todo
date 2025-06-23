import { getUserFromToken } from '@/shared/utils/getUserFromToken'
import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/shared/lib/mongo/mongobd'
import { ObjectId } from 'mongodb'

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const user = await getUserFromToken()
        if (!user) {
            return NextResponse.json({ ok: false }, { status: 401 })
        }

        const projectId = params.id
        const body = await req.json()

        const { title, description, icon, teamMembers } = body

        const db = await dbConnect()
        const project = db.collection('projects')

        const updateResult = await project.updateOne(
            {
                _id: new ObjectId(projectId),
                ownerId: user._id,
            },
            { $set: { title, description, icon, teamMembers } }
        )

        if (updateResult.matchedCount === 0) {
            return NextResponse.json(
                { ok: false, message: 'Project not found or no permission' },
                { status: 404 }
            )
        }

        return NextResponse.json({ ok: true, message: 'Project updated' })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const user = await getUserFromToken()

        if (!user) {
            return NextResponse.json({ ok: false, message: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()

        const db = await dbConnect()
        const collection = db.collection('projects')

        const resRemove = await collection.deleteOne({
            _id: new ObjectId(String(body.id)),
            ownerId: user._id,
        })

        if (resRemove.deletedCount === 0) {
            return NextResponse.json(
                { ok: false, message: 'Project not found or not owned by user' },
                { status: 404 }
            )
        }

        return NextResponse.json({ ok: true }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ ok: false, message: 'Internal Server Error' }, { status: 500 })
    }
}
