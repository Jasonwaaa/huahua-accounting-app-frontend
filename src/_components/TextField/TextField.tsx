import { FC, ComponentPropsWithoutRef, useId } from 'react'
import clsx from 'clsx'
import Input from '../Input'

interface Props extends Omit<ComponentPropsWithoutRef<typeof Input>, 'id'> {
  label?: string
  errorMessage?: string
}

const TextField: FC<Props> = ({
  label = undefined,
  errorMessage = undefined,
  className,
  ...rest
}) => {
  const generatedId = useId()
  const inputId = generatedId

  return (
    <div className="space-y-1 md:space-y-2">
      {label && (
        <label
          htmlFor={inputId}
          className={clsx('block text-sm text-neutral-400')}
        >
          {label}
        </label>
      )}

      <div className="relative">
        <Input
          id={inputId}
          {...rest}
          className={clsx(errorMessage ? 'border-rose-500' : '', className)}
        />
        {errorMessage && (
          <p className="absolute mt-1 text-xs text-rose-500">{errorMessage}</p>
        )}
      </div>
    </div>
  )
}

export default TextField
