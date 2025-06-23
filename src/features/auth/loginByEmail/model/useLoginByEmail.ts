'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginType {
    email: string
    password: string
}

export const useLoginByEmail = () => {
    const router = useRouter()
    const [loginForm, setLoginForm] = useState<LoginType>({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const loginHandleChange = (field: string) => (value: string) => {
        setLoginForm((prev) => ({ ...prev, [field]: value }))
        if (error) setError('')
    }

    const handleLogin = async () => {
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
            })

            if (res.ok) {
                router.replace('/')
            } else {
                const data = await res.json()
                setError(data.message)
            }
        } catch (error) {
            console.error(error)
            setError('')
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return { loginForm, loginHandleChange, handleLogin, isLoading, error }
}
