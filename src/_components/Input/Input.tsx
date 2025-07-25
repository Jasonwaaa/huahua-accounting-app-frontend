import { FC, InputHTMLAttributes, useState } from 'react'
import { DynamicIcon } from 'lucide-react/dynamic'
import { type IconName } from 'lucide-react/dynamic'
import clsx from 'clsx'
import './Input.css'
import IconButton from '../IconButton'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix'> {
  prefix?: {
    name: IconName
    label?: string
  }
}

const Input: FC<Props> = ({ className, type, prefix = undefined, ...rest }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const showPasswordReveal = type === 'password'

  return (
    <div className={clsx((prefix ?? showPasswordReveal) && 'relative')}>
      {prefix && (
        <div className="absolute bottom-0 left-0 top-0 flex items-center pl-4">
          <DynamicIcon
            className="text-neutral-400"
            name={prefix.name}
            aria-label={prefix.label}
          />
        </div>
      )}
      <input
        type={isPasswordVisible ? 'text' : type}
        className={clsx(
          'box-border h-12 w-full',
          'rounded-lg border border-neutral-400',
          'bg-white text-neutral-900',
          prefix ? 'pl-12' : 'pl-4 lg:pl-6',
          showPasswordReveal ? 'pr-12' : 'pr-4 lg:pr-6',
          className
        )}
        {...rest}
      />
      {showPasswordReveal && (
        <div className="absolute bottom-0 right-0 top-0 flex items-center pr-2">
          <IconButton
            onClick={() =>
              setIsPasswordVisible(
                (previousIsPasswordVisible) => !previousIsPasswordVisible
              )
            }
            icon={isPasswordVisible ? 'eye' : 'eye-closed'}
            label={isPasswordVisible ? 'Hide password' : 'Show password'}
            size="small"
            variant="naked"
          />
        </div>
      )}
    </div>
  )
}

export default Input
