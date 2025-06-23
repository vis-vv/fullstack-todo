import styles from './ProjectHeader.module.css'
import Button from '@/shared/ui/button/Button'
import React, { useState } from 'react'
import { ModalWindow } from '@/shared/ui/Modal/ModalWindow'
import { CreateProjectForm } from '@/features/projectsForm/ui/createProjectForm/CreateProjectForm'

export const ProjectHeader = () => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen((prev) => !prev)
    }
    return (
        <>
            <div className={styles.pageHeader}>
                <div>
                    <h1 className={styles.title}>Мои проекты</h1>
                    <p className={styles.pageSubtitle}>Управляйте своими проектами и задачами</p>
                </div>
                <div>
                    <Button onClick={openModal}>
                        <i className="material-icons">control_point_duplicate</i>
                        <p>Новый проект</p>
                    </Button>
                </div>
            </div>

            {isOpen && (
                <ModalWindow>
                    <CreateProjectForm setIsOpen={setIsOpen} />
                </ModalWindow>
            )}
        </>
    )
}
