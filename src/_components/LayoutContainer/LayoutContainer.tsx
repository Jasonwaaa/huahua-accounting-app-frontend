import { FC, ReactNode } from 'react'
import clsx from 'clsx'

interface Props {
  children: ReactNode
  className?: string
}

const LayoutContainer: FC<Props> = ({ children, className = '' }) => (
  <div className={clsx('mx-auto max-w-[1690px] px-8', className)}>
    {children}
  </div>
)

export default LayoutContainer
