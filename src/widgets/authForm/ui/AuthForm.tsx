'use client'

import styles from './AuthFrom.module.css'
import React from 'react'
import { InfoSection } from '@/widgets/authForm/ui/InfoSection/InfoSection'
import { FormSection } from '@/widgets/authForm/ui/FormSection/FormSection'

export const AuthForm = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <InfoSection />
                <FormSection />
            </div>
        </div>
    )
}
