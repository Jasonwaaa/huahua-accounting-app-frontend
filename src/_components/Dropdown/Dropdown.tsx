'use client'

import clsx from 'clsx'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'

type Position = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

type Size = 'small' | 'default' | 'large'

type Variant = 'light' | 'dark'

interface Props {
  trigger: (toggle: () => void, isOpen: boolean) => ReactNode
  children: ReactNode | ((toggle: () => void) => ReactNode)
  size?: Size
  position?: Position
  variant?: Variant
}

export const POSITION = {
  'bottom-left': clsx('left-0 top-full mt-2'),
  'bottom-right': clsx('right-0 top-full mt-2'),
  'top-left': clsx('bottom-full left-0 mb-2'),
  'top-right': clsx('bottom-full right-0 mb-2'),
} as const

export const SIZE = {
  small: 'w-40',
  default: 'w-60',
  large: 'w-[500px]',
} as const

export const VARIANT = {
  light: clsx('border-neutral-300 bg-white'),
  dark: clsx('border-[#3a2a5a] bg-[#221540]'),
}

const Dropdown: FC<Props> = ({
  trigger,
  children,
  position = 'bottom-left',
  size = 'default',
  variant = 'light',
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const triggerContainerRef = useRef<HTMLDivElement>(null)

  const toggle = (): void => setIsOpen((previousIsOpen) => !previousIsOpen)

  useEffect(() => {
    const handleClick = (event: MouseEvent): void => {
      if (
        !(event.target instanceof Element) ||
        triggerContainerRef.current?.contains(event.target)
      ) {
        return
      }

      if (typeof children === 'function') {
        return
      }

      setIsOpen(false)
    }

    document.addEventListener('click', handleClick)

    return (): void => {
      document.removeEventListener('click', handleClick)
    }
  }, [children])

  return (
    <div className="relative">
      <div ref={triggerContainerRef}>{trigger(toggle, isOpen)}</div>
      {isOpen && (
        <div
          role="menu"
          className={clsx(
            'absolute z-50 mt-2 rounded border px-2 py-4 shadow-lg',
            POSITION[position],
            SIZE[size],
            VARIANT[variant]
          )}
        >
          {typeof children === 'function' ? children(toggle) : children}
        </div>
      )}
    </div>
  )
}

export default Dropdown
