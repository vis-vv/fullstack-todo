import React, { useState } from 'react'
import { IProjectForm } from '@/features/createProject/model/type'
import { formatDate } from '@/shared/utils/formatDate'
import { useRouter } from 'next/navigation'

export const useCreateProject = (
    onSuccess: () => void
): {
    createForm: IProjectForm
    setCreateForm: React.Dispatch<React.SetStateAction<IProjectForm>>
    error: string
    creatingProjectBD: () => Promise<void>
    loading: boolean
} => {
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(false)

    const [createForm, setCreateForm] = useState<IProjectForm>({
        title: '',
        description: '',
        icon: {
            name: '',
            color: '',
        },
        teamMembers: [],
        date: formatDate(new Date()),
    })
    const [error, setError] = useState<string>('')

    const creatingProjectBD = async () => {
        setError('')
        if (createForm.title.length === 0) {
            setError('Введите имя проекта')
            return
        }

        try {
            setLoading(true)
            const res = await fetch('/api/project', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createForm),
            })

            const data = await res.json()
            if (!res.ok) {
                setError(data.message || 'Ошибка создания проекта')
            }
            router.refresh()
            onSuccess()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        createForm,
        setCreateForm,
        error,
        creatingProjectBD,
        loading,
    }
}
