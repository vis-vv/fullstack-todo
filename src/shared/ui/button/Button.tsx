'use client'

import type React from 'react'

import styles from './Button.module.css'

interface ButtonProps {
    children: React.ReactNode
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    fullWidth?: boolean
    variant?: 'primary' | 'secondary' | 'ghost' | 'remove'
    onClick?: () => void
}

export default function Button({
    children,
    type = 'button',
    disabled = false,
    fullWidth = false,
    variant = 'primary',
    onClick,
}: ButtonProps) {
    const className = [
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        disabled ? styles.disabled : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <button type={type} disabled={disabled} onClick={onClick} className={className}>
            {children}
        </button>
    )
}
