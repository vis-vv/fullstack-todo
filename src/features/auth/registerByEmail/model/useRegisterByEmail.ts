'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface FormType {
    name: string
    email: string
    password: string
}

export const useRegisterByEmail = () => {
    const router = useRouter()
    const [form, setForm] = useState<FormType>({
        name: '',
        email: '',
        password: '',
    })
    const [error, setError] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const handleChange = (field: string) => (value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }))
        if (error) setError('')
    }

    const handleRegister = async () => {
        if (!validate(form)) {
            setError('Пожалуйста, заполните все поля корректно')
            return
        }

        try {
            const res = await fetch('/api/auth/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    password: form.password,
                }),
            })

            if (res.ok) {
                router.replace('/')
            } else {
                const data = await res.json()
                setError(data.message)
            }
        } catch (error) {
            console.error(error)
            setError('Сетевая ошибка, попробуйте позже')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        form,
        handleChange,
        handleRegister,
        error,
        isLoading,
    }
}

const validate = (form: FormType) => {
    return form.name.trim() !== '' && validateEmail(form.email) && form.password.trim() !== ''
}

const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
