import clsx from 'clsx'
import { ReactNode, FC } from 'react'

export const PLACEMENT = {
  left: clsx('justify-start'),
  full: clsx('*:flex-1'),
  right: clsx('justify-end'),
} as const

type Placement = 'left' | 'full' | 'right'

interface Props {
  children: ReactNode
  placement?: Placement
}

const Item: FC<Props> = ({ children, placement = 'full' }) => (
  <li className={clsx('flex', PLACEMENT[placement])}>{children}</li>
)

export default Item
