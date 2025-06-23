import { useRouter } from 'next/navigation'

export const useLogoutButton = (): {
    logoutFromAccount: () => Promise<void>
} => {
    const router = useRouter()

    const logoutFromAccount = async () => {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
        })

        if (res.ok) {
            router.push('/')
        } else {
            alert('Ошибка при выходе')
        }
    }

    return {
        logoutFromAccount,
    }
}
