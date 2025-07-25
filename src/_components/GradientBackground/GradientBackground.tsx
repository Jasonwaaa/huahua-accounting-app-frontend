import { FC, ReactNode } from 'react'
import clsx from 'clsx'

export const VARIANT = {
  default: clsx('from-[#3f2b6f] to-[#5f4b90]'),
  light: clsx('from-[#4536ba] to-[#7d6fff]'),
  dark: clsx('from-[#453255] to-[#161231]'),
  dusk: clsx('from-[#3f2b6f] to-[#27194b]'),
} as const

type Variant = 'default' | 'light' | 'dark' | 'dusk'

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
}

const GradientBackground: FC<Props> = ({
  children,
  className = '',
  variant = 'default',
}) => (
  <div className={clsx('bg-gradient-to-t', VARIANT[variant], className)}>
    {children}
  </div>
)

export default GradientBackground
