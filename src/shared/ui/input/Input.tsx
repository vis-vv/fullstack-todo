import type React from 'react'

import styles from './Input.module.css'

interface InputProps {
    id?: string
    type?: string
    placeholder?: string
    required?: boolean
    value?: string
    onChange: (e: string) => void
}

export default function Input({
    id,
    type = 'text',
    placeholder,
    required = false,
    value,
    onChange,
}: InputProps) {
    return (
        <input
            id={id}
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.input}
        />
    )
}
