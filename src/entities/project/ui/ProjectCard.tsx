'use client'

import React, { useState } from 'react'
import styles from './ProjectCard.module.css'
import { DropdownMenu } from '@/shared/ui/Dropdown/DropdownMenu'
import { Project } from '@/entities/project/model/type'
import { ModalWindow } from '@/shared/ui/Modal/ModalWindow'
import { PutProjectForm } from '@/features/projectsForm/ui/putProjectForm/PutProjectForm'
import { useRouter } from 'next/navigation'

interface ProjectCardProps {
    project: Project
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const router = useRouter()
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false)

    const test = () => {
        router.push(`/project/${project._id}`)
    }
    return (
        <>
            <div className={styles.card} onClick={test}>
                <div className={styles.header}>
                    <h3>
                        <i className="material-icons" style={{ color: project?.icon?.color }}>
                            {project?.icon?.name.toLowerCase()}
                        </i>
                        {project.title}
                    </h3>
                    <div className={styles.menuContainer}>
                        <DropdownMenu
                            setIsOpenModal={setIsOpenModal}
                            items={['Редактировать', 'По рофлу', 'Удалить']}
                            trigger={
                                <i
                                    className={`material-icons ${styles.icon}`}
                                    style={{ color: '#fff' }}
                                >
                                    more_horiz
                                </i>
                            }
                        />
                    </div>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                <div className={styles.body}>
                    <div className={styles.stat}>
                        <h3>0</h3>
                        <p>задач</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>0</h3>
                        <p>в работе</p>
                    </div>
                    <div className={styles.stat}>
                        <h3>0</h3>
                        <p>завершено</p>
                    </div>
                </div>
            </div>

            {isOpenModal && (
                <ModalWindow>
                    <PutProjectForm setIsOpen={setIsOpenModal} project={project} />
                </ModalWindow>
            )}
        </>
    )
}
