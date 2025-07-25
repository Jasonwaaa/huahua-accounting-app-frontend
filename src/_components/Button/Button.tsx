import clsx from 'clsx'
import { Loader } from 'lucide-react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { ButtonHTMLAttributes, FC, ReactNode } from 'react'

export const VARIANT = {
  primary: clsx(
    'border border-[#6459e5] bg-[#6459e5] text-white hover:bg-indigo-600 disabled:border-[#c6c6dd] disabled:bg-[#c6c6dd] disabled:text-white'
  ),
  secondary: clsx(
    'border border-[#b0b0b0] bg-white text-[#2e2e2e] hover:border-neutral-200 hover:bg-neutral-200'
  ),
  underline: clsx(
    'border border-transparent text-[#727272] underline decoration-[#727272] hover:border-neutral-200 hover:bg-neutral-200'
  ),
  naked: clsx('border border-transparent text-inherit hover:border-current'),
  success: clsx(
    'border border-[#6cffa0] bg-[#6cffa0] text-[#2e2e2e] hover:border-green-400 hover:bg-green-400'
  ),
  warning: clsx(
    'border border-amber-500 bg-amber-500 text-white hover:border-amber-700 hover:bg-amber-700'
  ),
  danger: clsx(
    'border border-rose-500 bg-rose-500 text-white hover:border-rose-700 hover:bg-rose-700'
  ),
  light: clsx(
    'border border-transparent bg-white/15 text-inherit hover:border-current'
  ),
} as const

export const SIZE = {
  default: clsx('h-11 px-4 text-base md:h-12'),
  large: clsx('h-14 px-8 text-lg'),
  small: clsx('h-10 px-2 text-sm'),
} as const

type Size = 'default' | 'large' | 'small'

type Variant =
  | 'primary'
  | 'secondary'
  | 'underline'
  | 'naked'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'

interface Props
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'prefix' | 'suffix'> {
  isLoading?: boolean
  children: ReactNode
  size?: Size
  variant?: Variant
  prefix?: {
    label?: string
    icon: IconName
  }
  suffix?: {
    label?: string
    icon: IconName
  }
}

const Button: FC<Props> = ({
  children,
  className,
  isLoading = false,
  size = 'default',
  variant = 'primary',
  type = 'button',
  prefix = undefined,
  suffix = undefined,
  ...rest
}) => (
  <button
    className={clsx(
      'rounded-[10px] align-middle outline-none outline-offset-0',
      'whitespace-nowrap font-bold leading-tight',
      'disabled:cursor-not-allowed',
      (prefix ?? suffix) && 'inline-flex items-center gap-2',
      VARIANT[variant],
      SIZE[size],
      className
    )}
    disabled={isLoading}
    type={type}
    {...rest}
  >
    {isLoading ? (
      <Loader
        className="mx-auto animate-spin"
        role="status"
        aria-label="Loading"
      />
    ) : (
      <>
        {prefix && <DynamicIcon name={prefix.icon} aria-label={prefix.label} />}
        {children}
        {suffix && <DynamicIcon name={suffix.icon} aria-label={suffix.label} />}
      </>
    )}
  </button>
)

export default Button
