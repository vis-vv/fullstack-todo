import { useLogoutButton } from '@/features/auth/logoutButton/model/useLogoutButton'

export const LogoutButton = () => {
    const { logoutFromAccount } = useLogoutButton()

    return (
        <>
            <button onClick={logoutFromAccount}>Выход</button>
        </>
    )
}
