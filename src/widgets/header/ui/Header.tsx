'use client'
import React from 'react'
import styles from './Header.module.css'
import { usePathname } from 'next/navigation'
import Button from '@/shared/ui/button/Button'

export const Header = () => {
    const pathname = usePathname()

    if (pathname === '/login') return

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logo}>
                    <div className={styles.logoIcon}>✨</div>
                    <div>
                        <div className={styles.logoText}>Team ToDo</div>
                        <div className={styles.logoSubtitle}>Kanban Board</div>
                    </div>
                </div>

                <div className={styles.headerCenter}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchIcon}>🔍</div>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Поиск задач, проектов, участников..."
                        />
                    </div>
                </div>

                <div className={styles.headerActions}>
                    <Button variant="secondary">🔽 Фильтры</Button>
                    <Button variant="secondary">
                        🔔
                        <span className="notification-badge">3</span>
                    </Button>
                    <Button variant="secondary">⚙</Button>
                    <Button>➕ Добавить задачу</Button>
                    <div
                        className={`${styles.userAvatar}  ${styles.tooltip}`}
                        data-tooltip="Иван Иванов"
                    >
                        ИИ
                    </div>
                </div>
            </div>
        </header>
    )
}
