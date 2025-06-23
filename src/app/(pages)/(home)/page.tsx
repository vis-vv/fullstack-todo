'use server'
import { ProjectWidget } from '@/widgets/projectWidget/ui/ProjectWidget'
import { getUserProjects } from '@/app/api/getProject/getUserProjects'

export default async function Home() {
    const projects = await getUserProjects()

    return (
        <div>
            <ProjectWidget projects={projects} />
        </div>
    )
}
