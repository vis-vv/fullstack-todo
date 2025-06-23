'use client'
import { ProjectCard } from '@/entities/project/ui/ProjectCard'
import styles from './ProjectWidget.module.css'
import { ProjectHeader } from '@/widgets/projectWidget/ui/ProjectHeader'
import {IProjectType} from "@/features/projectsForm/model/type";


interface ProjectType {
    projects: IProjectType[]
}

export const ProjectWidget = ({ projects }: ProjectType) => {
    return (
        <div className={styles.widget}>
            <div className="container">
                {/*<LogoutButton/>
                <CreateProjectForm/>*/}

                <ProjectHeader />
                <div className={styles.projects}>
                    {projects?.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </div>
    )
}
