import styles from './ModalHeader.module.css'
import { X } from 'lucide-react'
import React from 'react'

interface IModalHeaderProps {
    setIsOpen: (boolean: boolean) => void
    title: string
    subtitle: string
}

export const ModalHeader = ({ setIsOpen, title, subtitle }: IModalHeaderProps) => {
    return (
        <div className={styles.modalHeader}>
            <div className={styles.modalTitleRow}>
                <div className={styles.modalTitle}>{title}</div>
                <div onClick={() => setIsOpen(false)} className={styles.closeButton}>
                    <X size={20} />
                </div>
            </div>
            <p className={styles.modalSubtitle}>{subtitle}</p>
        </div>
    )
}
