import clsx from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import Dark from './assets/logo-dark.svg'
import Light from './assets/logo-light.svg'

type Variant = 'light' | 'dark'

interface Props {
  variant?: Variant
  className?: string
  width?: number
  height?: number
}

const Logo: FC<Props> = ({ variant = 'light', className = '' }) => {
  const Variation = variant === 'light' ? Light : Dark

  return (
    <Link
      aria-label="Meta Town"
      href="/"
      className={clsx('inline-block', className)}
    >
      <Variation role="img" aria-label={`Meta Town (${variant})`} />
    </Link>
  )
}

export default Logo
