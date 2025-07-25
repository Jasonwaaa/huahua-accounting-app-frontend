import { ComponentProps, FC } from 'react'
import Button from '@/_components/Button'
import IconButton from '@/_components/IconButton'
import Configuration from './_components/Configuration'

type ButtonProps = Omit<ComponentProps<typeof Button>, 'prefix' | 'suffix'>

type IconButtonProps = ComponentProps<typeof IconButton>

interface ConfigurableProps {
  variant?: ComponentProps<typeof Configuration>['variant']
  onConfig: () => void
}

type Props = (ButtonProps | IconButtonProps) & ConfigurableProps

const isButtonProps = (
  props: ButtonProps | IconButtonProps
): props is ButtonProps => 'children' in props

const isIconButtonProps = (
  props: ButtonProps | IconButtonProps
): props is IconButtonProps => 'icon' in props && 'label' in props

const ButtonConfigurable: FC<Props> = ({
  size = 'default',
  variant = 'primary',
  onConfig,
  ...props
}) => (
  <div className="relative isolate inline-flex">
    <div className="relative z-10 mr-8">
      {isButtonProps(props) && (
        <Button
          {...props}
          size={size}
          variant={variant}
          className="!rounded-2xl"
        />
      )}
      {isIconButtonProps(props) && (
        <IconButton {...props} size={size} variant={variant} />
      )}
    </div>
    <Configuration onClick={onConfig} size={size} variant={variant} />
  </div>
)

export default ButtonConfigurable
