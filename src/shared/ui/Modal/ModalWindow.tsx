import styles from './ModalWindow.module.css'
import React from "react";

interface ProjectProps {
    children: React.ReactNode
}

export const ModalWindow = ({ children }: ProjectProps) => {
    console.log(children)
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <div className={styles.modal}>{children}</div>
            </div>
        </div>
    )
}
