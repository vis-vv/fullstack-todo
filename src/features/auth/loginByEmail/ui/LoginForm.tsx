'use client'
import styles from '@/widgets/authForm/ui/FormSection/FormSection.module.css'
import Input from '@/shared/ui/input/Input'
import Button from '@/shared/ui/button/Button'
import React from 'react'
import { useLoginByEmail } from '@/features/auth/loginByEmail/model/useLoginByEmail'

export const LoginForm = () => {
    const { loginForm, loginHandleChange, handleLogin, isLoading, error } = useLoginByEmail()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleLogin()
    }
    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email" className={styles.label}>
                        Email
                    </label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={loginForm.email}
                        onChange={loginHandleChange('email')}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password" className={styles.label}>
                        Пароль
                    </label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={loginForm.password}
                        onChange={loginHandleChange('password')}
                    />
                </div>
                <Button type="submit" disabled={isLoading} fullWidth variant="primary">
                    {isLoading ? 'Вход...' : 'Войти'}
                </Button>
            </form>

            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </>
    )
}
