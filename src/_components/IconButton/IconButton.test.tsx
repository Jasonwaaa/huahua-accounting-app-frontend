import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SIZE as BUTTON_SIZE, VARIANT as BUTTON_VARIANT } from '../Button'
import { POSITION as TOOLTIP_POSITION } from '../Tooltip'
import IconButton, { ICON_SIZE, SIZE } from './IconButton'

describe('IconButton', () => {
  test('renders icon', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(
      await screen.findByRole('button', { name: 'Beer' })
    ).toBeInTheDocument()
  })

  test('passes the native onClick property to the attribute', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<IconButton icon="beer" label="Beer" onClick={handleClick} />)

    await user.click(await screen.findByRole('button', { name: 'Beer' }))

    expect(handleClick).toBeCalledTimes(1)
  })

  test('renders button with default size', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      SIZE.default
    )

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      BUTTON_SIZE.default
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders button with %s size',
    async (size) => {
      render(<IconButton size={size} icon="beer" label="Beer" />)

      expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
        SIZE[size]
      )

      expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_SIZE[size]
      )
    }
  )

  test('renders button with default rounded square', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      '!rounded-2xl'
    )
  })

  test('renders circle button', async () => {
    render(<IconButton icon="beer" label="Beer" circle />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      '!rounded-full'
    )
  })

  test('renders button with default variant', async () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      BUTTON_VARIANT.primary
    )
  })

  test.each([
    'primary',
    'secondary',
    'naked',
    'success',
    'danger',
    'warning',
  ] as const)('renders button with %s variant', async (variant) => {
    render(<IconButton variant={variant} icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      BUTTON_VARIANT[variant]
    )
  })

  test('renders Tooltip', () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(screen.getByRole('tooltip', { name: 'Beer' })).toBeInTheDocument()
  })

  test('renders Tooltip with default bottom position', () => {
    render(<IconButton icon="beer" label="Beer" />)

    expect(screen.getByRole('tooltip', { name: 'Beer' })).toHaveClass(
      TOOLTIP_POSITION.bottom
    )
  })

  test.each([
    'top-left',
    'top',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const)('renders Tooltip with %s position', (position) => {
    render(<IconButton icon="beer" label="Beer" tooltip={{ position }} />)

    expect(screen.getByRole('tooltip', { name: 'Beer' })).toHaveClass(
      TOOLTIP_POSITION[position]
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders icon with %s size',
    async (size) => {
      render(<IconButton size={size} icon="beer" label="Beer" />)

      expect(await screen.findByLabelText('Beer')).toBeInTheDocument()

      expect(screen.getByLabelText('Beer')).toHaveAttribute(
        'width',
        ICON_SIZE[size].toString()
      )

      expect(screen.getByLabelText('Beer')).toHaveAttribute(
        'height',
        ICON_SIZE[size].toString()
      )
    }
  )

  test('renders icon from config object with custom label', async () => {
    render(
      <IconButton
        icon={{ name: 'beer', label: 'Custom Icon Label' }}
        label="Beer"
      />
    )

    expect(
      await screen.findByRole('button', { name: 'Custom Icon Label' })
    ).toBeInTheDocument()
  })
})
