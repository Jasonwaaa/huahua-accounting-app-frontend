import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ButtonConfigurable from '@/_components/ButtonConfigurable'
import {
  VARIANT as BUTTON_VARIANT,
  SIZE as BUTTON_SIZE,
} from '@/_components/Button'
import {
  WRAPPER_SIZE,
  VARIANT as CONFIGURATION_VARIANT,
} from './_components/Configuration'

describe('ButtonConfigurable', () => {
  test('renders Button', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
  })

  test('renders Configuration', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Config' })).toBeInTheDocument()
  })

  test('renders Configuration with default size', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Config' })).toHaveClass(
      WRAPPER_SIZE.default
    )
  })

  test('renders Configuration with default primary variant', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Config' })).toHaveClass(
      CONFIGURATION_VARIANT.primary
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders Configuration with %s size',
    (size) => {
      render(
        <ButtonConfigurable onConfig={vi.fn()} size={size}>
          Button
        </ButtonConfigurable>
      )

      expect(screen.getByRole('button', { name: 'Config' })).toHaveClass(
        WRAPPER_SIZE[size]
      )
    }
  )

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders Configuration with %s variant',
    (variant) => {
      render(
        <ButtonConfigurable onConfig={vi.fn()} variant={variant}>
          Button
        </ButtonConfigurable>
      )

      expect(screen.getByRole('button', { name: 'Config' })).toHaveClass(
        CONFIGURATION_VARIANT[variant]
      )
    }
  )

  test('renders Button with default size', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      BUTTON_SIZE.default
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders Button with %s size',
    (size) => {
      render(
        <ButtonConfigurable onConfig={vi.fn()} size={size}>
          Button
        </ButtonConfigurable>
      )

      expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
        BUTTON_SIZE[size]
      )
    }
  )

  test('renders Button with default primary variant', () => {
    render(<ButtonConfigurable onConfig={vi.fn()}>Button</ButtonConfigurable>)

    expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
      BUTTON_VARIANT.primary
    )
  })

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders Button with %s variant',
    (variant) => {
      render(
        <ButtonConfigurable onConfig={vi.fn()} variant={variant}>
          Button
        </ButtonConfigurable>
      )

      expect(screen.getByRole('button', { name: 'Button' })).toHaveClass(
        BUTTON_VARIANT[variant]
      )
    }
  )

  test('renders IconButton', async () => {
    render(<ButtonConfigurable onConfig={vi.fn()} icon="beer" label="Beer" />)

    expect(
      await screen.findByRole('button', { name: 'Beer' })
    ).toBeInTheDocument()
  })

  test('renders IconButton with default size', async () => {
    render(<ButtonConfigurable onConfig={vi.fn()} icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      BUTTON_SIZE.default
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders IconButton with %s size',
    async (size) => {
      render(
        <ButtonConfigurable
          onConfig={vi.fn()}
          size={size}
          icon="beer"
          label="Beer"
        />
      )

      expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_SIZE[size]
      )
    }
  )

  test('render IconButton with default primary variant', async () => {
    render(<ButtonConfigurable onConfig={vi.fn()} icon="beer" label="Beer" />)

    expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
      BUTTON_VARIANT.primary
    )
  })

  test.each(['primary', 'secondary', 'success', 'danger', 'warning'] as const)(
    'renders IconButton with %s variant',
    async (variant) => {
      render(
        <ButtonConfigurable
          onConfig={vi.fn()}
          variant={variant}
          icon="beer"
          label="Beer"
        />
      )

      expect(await screen.findByRole('button', { name: 'Beer' })).toHaveClass(
        BUTTON_VARIANT[variant]
      )
    }
  )

  test('calls onClick when icon button is clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()

    render(
      <ButtonConfigurable
        onConfig={vi.fn()}
        icon="beer"
        label="Beer"
        onClick={onClick}
      />
    )

    await user.click(await screen.findByRole('button', { name: 'Beer' }))

    expect(onClick).toHaveBeenCalled()
  })

  test('calls onConfig when config button is clicked', async () => {
    const onConfig = vi.fn()
    const user = userEvent.setup()

    render(<ButtonConfigurable icon="beer" label="Beer" onConfig={onConfig} />)

    await user.click(screen.getByRole('button', { name: 'Config' }))

    expect(onConfig).toHaveBeenCalled()
  })

  test('disables icon button when disabled props value is true', async () => {
    render(
      <ButtonConfigurable
        onConfig={vi.fn()}
        icon="beer"
        label="Beer"
        disabled
      />
    )

    expect(await screen.findByRole('button', { name: 'Beer' })).toBeDisabled()
  })
})
