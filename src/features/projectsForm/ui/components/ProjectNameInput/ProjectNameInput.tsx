import styles from '@/features/projectsForm/ui/components/ProjectNameInput/ProjectNameInput.module.css'
import React from 'react'
import { IProjectForm } from '@/features/projectsForm/model/type'

interface Props {
    createForm: IProjectForm
    setCreateForm: React.Dispatch<React.SetStateAction<IProjectForm>>
    error: string
}

export const ProjectNameInput = ({ createForm, setCreateForm, error }: Props) => {
    return (
        <>
            <div className={styles.formRow}>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Название проекта *</label>
                    <input
                        value={createForm.title}
                        onChange={(e) =>
                            setCreateForm((prev) => ({ ...prev, title: e.target.value }))
                        }
                        placeholder="Введите название проекта"
                        className={styles.input}
                    />
                    {error && <div className={styles.error}>{error}</div>}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Описание проекта</label>
                <textarea
                    value={createForm.description}
                    onChange={(e) =>
                        setCreateForm((prev) => ({ ...prev, description: e.target.value }))
                    }
                    placeholder="Опишите цели и задачи проекта..."
                    className={styles.textarea}
                    rows={3}
                />
            </div>
        </>
    )
}
