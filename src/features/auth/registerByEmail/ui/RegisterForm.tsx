import styles from '@/widgets/authForm/ui/FormSection/FormSection.module.css'
import Input from '@/shared/ui/input/Input'
import Button from '@/shared/ui/button/Button'
import React from 'react'
import { useRegisterByEmail } from '@/features/auth/registerByEmail/model/useRegisterByEmail'

export const RegisterForm = () => {
    const { form, handleChange, handleRegister, error, isLoading } = useRegisterByEmail()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        await handleRegister()
    }

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName" className={styles.label}>
                            Имя
                        </label>
                        <Input
                            id="firstName"
                            placeholder="Иван"
                            required
                            value={form.name}
                            onChange={handleChange('name')}
                        />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="registerEmail" className={styles.label}>
                        Email
                    </label>
                    <Input
                        id="registerEmail"
                        type="email"
                        placeholder="your@email.com"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="registerPassword" className={styles.label}>
                        Пароль
                    </label>
                    <Input
                        id="registerPassword"
                        type="password"
                        placeholder="••••••••"
                        required
                        value={form.password}
                        onChange={handleChange('password')}
                    />
                </div>
                <Button type="submit" disabled={isLoading} fullWidth variant="primary">
                    {isLoading ? 'Создание...' : 'Создать аккаунт'}
                </Button>
            </form>

            {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        </>
    )
}
