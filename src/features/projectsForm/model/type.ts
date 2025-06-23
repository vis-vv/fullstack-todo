export interface IProjectType {
    _id: string
    title: string
    description: string
    icon?: {
        name: string
        color: string
    }
    teamMembers: string[]
    date: string
    createdAt: string
    ownerId: string
    members: string[]
    invites: string[]
}

export interface IProjectForm {
    title: string
    description: string
    icon: { name: string; color: string }
    teamMembers: string[]
    date: string
}
