'use client'

import type React from 'react'

import styles from './Tabs.module.css'

interface TabsProps {
    activeTab: 'login' | 'register'
    onTabChange: (tab: 'login' | 'register') => void
    children: React.ReactNode
}

export default function Tabs({ activeTab, onTabChange, children }: TabsProps) {
    return (
        <div className={styles.tabs}>
            <div className={styles.tabsList}>
                <button
                    className={`${styles.tabsTrigger} ${activeTab === 'login' ? styles.active : ''}`}
                    onClick={() => onTabChange('login')}
                >
                    Вход
                </button>
                <button
                    className={`${styles.tabsTrigger} ${activeTab === 'register' ? styles.active : ''}`}
                    onClick={() => onTabChange('register')}
                >
                    Регистрация
                </button>
            </div>
            {children}
        </div>
    )
}
