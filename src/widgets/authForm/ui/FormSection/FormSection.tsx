'use client'

import styles from './FormSection.module.css'
import Card from '@/widgets/authForm/ui/Card/Card'
import Tabs from '@/widgets/authForm/ui/Tabs/Tabs'
import React, { useState } from 'react'
import { LoginForm } from '@/features/auth/loginByEmail/ui/LoginForm'
import { RegisterForm } from '@/features/auth/registerByEmail/ui/RegisterForm'

export const FormSection = () => {
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

    return (
        <div className={styles.formSection}>
            <Card>
                <div className={styles.cardHeader}>
                    <h2 className={styles.cardTitle}>Добро пожаловать!</h2>
                    <p className={styles.cardDescription}>Войдите в аккаунт или создайте новый</p>
                </div>

                <div className={styles.cardContent}>
                    <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
                        <div className={styles.tabContent}>
                            {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
                        </div>
                    </Tabs>
                </div>
            </Card>
        </div>
    )
}
