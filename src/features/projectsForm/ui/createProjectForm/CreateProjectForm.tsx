import React from 'react'
import { useCreateProject } from '@/features/projectsForm/model/useCreateProject'
import styles from './CreateProject.module.css'

import { ProjectNameInput } from '@/features/projectsForm/ui/components/ProjectNameInput/ProjectNameInput'
import { FormGroupIcons } from '@/features/projectsForm/ui/components/FormGroupIcons/FormGroupIcons'
import { CreateFromGroup } from '@/features/projectsForm/ui/components/CreateFromGroup/CreateFromGroup'
import { ModalHeader } from '@/shared/ui/Modal/ModalHeader'
import { ModalFooter } from '@/shared/ui/Modal/ModalFooter'

interface ProjectProps {
    setIsOpen: (isOpen: boolean) => void
}

export const CreateProjectForm = ({ setIsOpen }: ProjectProps) => {
    const { createForm, setCreateForm, error, creatingProjectBD, loading } = useCreateProject(() =>
        setIsOpen(false)
    )

    return (
        <div>
            <ModalHeader
                setIsOpen={setIsOpen}
                title="Создать новый проект"
                subtitle="Настройте ваш новый проект и начните работу с командой"
            />
            <div className={styles.formSection}>
                <ProjectNameInput
                    createForm={createForm}
                    setCreateForm={setCreateForm}
                    error={error}
                />
                <FormGroupIcons setCreateForm={setCreateForm} />
                <CreateFromGroup />
            </div>

            <ModalFooter
                onClick={creatingProjectBD}
                setIsOpen={setIsOpen}
                loading={loading}
                btnText="Создать проект"
            />
        </div>
    )
}
