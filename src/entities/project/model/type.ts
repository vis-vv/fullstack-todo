export interface Project {
    _id: string
    title: string
    description: string
    icon?: {
        name: string
        color: string
    }
    createdAt: string
    date: string
    ownerId: string
    members: string[]
    invites: string[]
    teamMembers: string[]
}
