import styles from './DropdownMenu.module.css'
import React, { HTMLAttributes, ReactElement, useEffect, useRef, useState } from 'react'

interface Props {
    items: string[]
    trigger: ReactElement<HTMLAttributes<HTMLElement>>
    setIsOpenModal: (isOpen: boolean) => void
}

export const DropdownMenu = ({ items, trigger, setIsOpenModal }: Props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()
        e.preventDefault()
        setIsMenuOpen((prev) => !prev)
    }

    const handleMenuItemClick = (item: string) => {
        if (item === 'Редактировать') {
            setIsOpenModal(true)
        }
        setIsMenuOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isMenuOpen])

    return (
        <>
            {React.cloneElement(trigger, { onClick: handleToggle })}

            {isMenuOpen && (
                <div ref={menuRef} className={styles.dropdownMenu}>
                    {items.map((item, index) => (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                handleMenuItemClick(item)
                            }}
                            key={index}
                            className={item === 'Удалить' ? styles.deleteButton : ''}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </>
    )
}
