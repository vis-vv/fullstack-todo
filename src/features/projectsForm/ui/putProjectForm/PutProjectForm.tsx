import { ModalHeader } from '@/shared/ui/Modal/ModalHeader'
import { ModalFooter } from '@/shared/ui/Modal/ModalFooter'
import styles from '@/features/projectsForm/ui/putProjectForm/PutProjectForm.module.css'
import { ProjectNameInput } from '@/features/projectsForm/ui/components/ProjectNameInput/ProjectNameInput'
import { FormGroupIcons } from '@/features/projectsForm/ui/components/FormGroupIcons/FormGroupIcons'
import { CreateFromGroup } from '@/features/projectsForm/ui/components/CreateFromGroup/CreateFromGroup'
import React from 'react'
import { usePutProject } from '@/features/projectsForm/model/usePutProject'
import { IProjectType } from '@/features/projectsForm/model/type'
import { useDeleteProject } from '@/features/projectsForm/model/useDeleteProject'

interface Props {
    setIsOpen: (isOpen: boolean) => void
    project: IProjectType
}

export const PutProjectForm = ({ setIsOpen, project }: Props) => {
    const { createForm, setCreateForm, updateProject, error, loading } = usePutProject(
        project,
        () => setIsOpen(false)
    )

    const { deleteProject } = useDeleteProject(project._id)

    return (
        <div>
            <ModalHeader
                setIsOpen={setIsOpen}
                title="Редактирование проекта"
                subtitle="Редактирование"
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
                onClick={updateProject}
                removeProject={true}
                deleteProject={deleteProject}
                setIsOpen={setIsOpen}
                loading={loading}
                btnText="Сохранить"
            />
        </div>
    )
}
