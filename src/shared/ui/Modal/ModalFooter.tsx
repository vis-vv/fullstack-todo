import styles from './ModalFooter.module.css'
import React from 'react'
import Button from '@/shared/ui/button/Button'

interface Props {
    onClick: () => void
    btnText: string
    loading?: boolean
    removeProject?: boolean
    deleteProject?: () => Promise<void>
    setIsOpen: (isOpen: boolean) => void
}

export const ModalFooter = ({
    onClick,

    btnText,
    loading,
    removeProject = false,
    deleteProject,
    setIsOpen,
}: Props) => {
    return (
        <div
            className={`${styles.modalFooter} 
            ${!removeProject ? styles.modalFooterFlex : ''}`}
        >
            {removeProject && (
                <Button variant="remove" onClick={deleteProject}>
                    Удалить
                </Button>
            )}

            <div className={styles.blockBtn}>
                <Button variant="secondary" onClick={() => setIsOpen(false)}>
                    Отмена
                </Button>

                <Button onClick={onClick}>{!loading ? btnText : ''}</Button>
            </div>
        </div>
    )
}
