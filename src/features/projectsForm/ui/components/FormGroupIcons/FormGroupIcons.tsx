import styles from '@/features/projectsForm/ui/components/FormGroupIcons/FormGroupIcons.module.css'
import React from 'react'
import { IProjectForm } from '@/features/projectsForm/model/type'

const projectIcons = [
    { name: 'build', color: '#667eea' },
    { name: 'settings', color: '#ed64a6' },
    { name: 'search', color: '#38b2ac' },
    { name: 'delete', color: '#ed8936' },
    { name: 'edit', color: '#48bb78' },
    { name: 'Settings', color: '#a0aec0' },
    { name: 'add_circle', color: '#9f7aea' },
    { name: 'web', color: '#4299e1' },
    { name: 'security', color: '#f56565' },
    { name: 'upload', color: '#ecc94b' },
    { name: 'home', color: '#fc8181' },
    { name: 'dashboard', color: '#fbb6ce' },
    { name: 'menu', color: '#68d391' },
    { name: 'notifications', color: '#4a5568' },
    { name: 'explore', color: '#63b3ed' },
    { name: 'chat', color: '#b794f6' },
    { name: 'info', color: '#f687b3' },
    { name: 'help_outline', color: '#81e6d9' },
    { name: 'warning', color: '#d69e2e' },
    { name: 'check_circle', color: '#805ad5' },
    { name: 'error', color: '#3182ce' },
    { name: 'rocket_launch', color: '#319795' },
    { name: 'science', color: '#e53e3e' },
    { name: 'visibility', color: '#dd6b20' },
    { name: 'bookmark', color: '#f6ad55' },
    { name: 'lightbulb', color: '#fbd38d' },
    { name: 'timeline', color: '#63b3ed' },
    { name: 'code', color: '#90cdf4' },
    { name: 'insights', color: '#9ae6b4' },
    { name: 'extension', color: '#d6bcfa' },
    { name: 'bolt', color: '#f56565' },
    { name: 'trending_up', color: '#48bb78' },
    { name: 'inventory', color: '#ed64a6' },
    { name: 'event', color: '#4fd1c5' },
    { name: 'language', color: '#4299e1' },
    { name: 'auto_graph', color: '#cbd5e0' },
]

interface ProjectProps {
    setCreateForm: React.Dispatch<React.SetStateAction<IProjectForm>>
}

export const FormGroupIcons = ({ setCreateForm }: ProjectProps) => {
    return (
        <div className={styles.formGroup}>
            <label className={styles.label}>Выберите иконку проекта</label>
            <div className={styles.iconGrid}>
                {projectIcons.map((item, index) => {
                    return (
                        <button
                            onClick={() =>
                                setCreateForm((prev) => ({
                                    ...prev,
                                    icon: { name: item.name, color: item.color },
                                }))
                            }
                            key={index}
                            className={styles.iconOption}
                            style={{ color: item.color } as React.CSSProperties}
                            title={item.name}
                        >
                            <i className="material-icons">{item.name.toLowerCase()}</i>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
