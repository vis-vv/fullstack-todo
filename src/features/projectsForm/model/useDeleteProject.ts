import { useRouter } from 'next/navigation'

export const useDeleteProject = (projectId: string): { deleteProject: () => Promise<void> } => {
    const router = useRouter()

    const deleteProject = async () => {
        try {
            const res = await fetch(`/api/project/${projectId}`, {
                method: 'DELETE',
                body: JSON.stringify({ id: projectId }),
            })

            if (res.status) {
                router.refresh()
            }
        } catch (error) {
            console.error(error)
        }
    }

    return {
        deleteProject,
    }
}
