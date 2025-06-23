import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {IProjectForm, IProjectType} from "@/features/projectsForm/model/type";

interface UsePutProjectReturn {
    createForm: IProjectForm
    setCreateForm: React.Dispatch<React.SetStateAction<IProjectForm>>
    error: string
    updateProject: () => Promise<IProjectType | void>
    loading: boolean
}

export const usePutProject = (
    project: IProjectType,
    onSuccess: () => void
): UsePutProjectReturn => {
    const router = useRouter()

    const [createForm, setCreateForm] = useState<IProjectForm>({
        title: project.title,
        description: project.description,
        icon: project.icon ?? { name: '', color: '' },
        teamMembers: [],
        date: project.date,
    })

    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const updateProject = async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/project/${project._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createForm),
            })

            if (!res.ok) {
                const errData = await res.json()
                setError('Не удалось обновить проект')
                throw new Error(errData || 'Failed to update project')
            }

            router.refresh()
            onSuccess()

            return await res.json()
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
        updateProject,
        loading,
    }
}
