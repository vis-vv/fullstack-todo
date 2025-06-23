import styles from './Badge.module.css'

interface BadgeProps {
    text: string
    variant?: 'default' | 'secondary'
}

export default function Badge({ text, variant = 'secondary' }: BadgeProps) {
    return <span className={`${styles.badge} ${styles[variant]}`}>{text}</span>
}
