import { FC } from 'react'
import clsx from 'clsx'

interface Props {
  status: 'online' | 'offline'
}

export const STATUS = {
  online: clsx('bg-green-500'),
  offline: clsx('bg-red-500'),
} as const

const Indicator: FC<Props> = ({ status }) => (
  <div role="status" className={clsx('h-2 w-2 rounded-full', STATUS[status])} />
)

export default Indicator
