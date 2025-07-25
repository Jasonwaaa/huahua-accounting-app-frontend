import clsx from 'clsx'
import { FC, useId, ReactNode } from 'react'

export const POSITION = {
  'top-left': clsx('bottom-full left-1 mb-2'),
  top: clsx('bottom-full left-1/2 mb-2 -translate-x-1/2'),
  'top-right': clsx('bottom-full right-1 mb-2'),

  left: clsx('right-full top-1/2 mr-2 -translate-y-1/2'),
  right: clsx('left-full top-1/2 ml-2 -translate-y-1/2'),

  'bottom-left': clsx('left-1 top-full mt-2'),
  bottom: clsx('left-1/2 top-full mt-2 -translate-x-1/2'),
  'bottom-right': clsx('right-1 top-full mt-2'),
} as const

type Position =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'left'
  | 'right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

interface Props {
  text: string
  position?: Position
  children: ReactNode
}

const Tooltip: FC<Props> = ({ children, text, position = 'bottom' }) => {
  const describedbyId = useId()

  return (
    <div className="group relative inline-block">
      <div aria-describedby={describedbyId}>{children}</div>
      <span
        id={describedbyId}
        role="tooltip"
        className={clsx(
          'absolute z-50 hidden whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white group-focus-within:block group-hover:block',
          POSITION[position]
        )}
      >
        {text}
      </span>
    </div>
  )
}

export default Tooltip
