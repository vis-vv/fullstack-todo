import styles from '@/features/projectsForm/ui/components/CreateFromGroup/CreateFromGroup.module.css'
import { X } from 'lucide-react'
import React from 'react'
import Button from '@/shared/ui/button/Button'

export const CreateFromGroup = () => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Участники команды</label>
            <div className={styles.teamSection}>
                <input placeholder="Введите email участника" className={styles.input} />
                <Button variant="secondary">Добавить</Button>
            </div>
            <div className={styles.selectedMembers}>
                <div className={styles.memberChip}>
                    <span>john@example.com</span>
                    <button className={styles.removeMember}>
                        <X size={14} />
                    </button>
                </div>
                <div className={styles.memberChip}>
                    <span>sarah@example.com</span>
                    <button className={styles.removeMember}>
                        <X size={14} />
                    </button>
                </div>
            </div>
        </div>
    )
}
