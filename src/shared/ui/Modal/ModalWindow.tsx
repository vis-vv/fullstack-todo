import styles from './ModalWindow.module.css'

interface ProjectProps {
    children: any
}

export const ModalWindow = ({ children }: ProjectProps) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modal}>{children}</div>
            </div>
        </div>
    )
}
