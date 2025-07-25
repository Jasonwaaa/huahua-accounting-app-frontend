import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button, { VARIANT, SIZE } from './Button'

describe('Button', () => {
  test('renders button with provided children', () => {
    render(<Button>Click me</Button>)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  test('passes the native onClick property to the attribute', async () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Create Spaces</Button>)

    await userEvent.click(screen.getByRole('button', { name: 'Create Spaces' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  test('renders prefix icon', async () => {
    render(
      <Button prefix={{ icon: 'camera', label: 'Camera' }}>
        Button Prefix
      </Button>
    )

    expect(await screen.findByLabelText('Camera')).toBeInTheDocument()
  })

  test('renders suffix icon', async () => {
    render(
      <Button suffix={{ icon: 'camera', label: 'Camera' }}>
        Button Suffix
      </Button>
    )

    expect(await screen.findByLabelText('Camera')).toBeInTheDocument()
  })

  test('renders button with default size', () => {
    render(<Button>Button</Button>)

    expect(screen.getByRole('button', { name: /Button/i })).toHaveClass(
      SIZE.default
    )
  })

  test.each(['small', 'default', 'large'] as const)(
    'renders button with %s size',
    (size) => {
      render(<Button size={size}>Size</Button>)

      expect(screen.getByRole('button', { name: /Size/i })).toHaveClass(
        SIZE[size]
      )
    }
  )

  test('renders button with default primary variant', () => {
    render(<Button>Variant</Button>)

    expect(screen.getByRole('button', { name: /Variant/i })).toHaveClass(
      VARIANT.primary
    )
  })

  test('renders button with isLoading', () => {
    render(<Button isLoading>Loading</Button>)

    expect(screen.getByRole('button', { name: /Loading/i })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: /Loading/i })).toHaveAttribute(
      'disabled'
    )

    expect(screen.getByRole('button', { name: /Loading/i })).toContainElement(
      screen.getByRole('status')
    )
  })

  test.each([
    'primary',
    'secondary',
    'underline',
    'naked',
    'success',
    'danger',
    'warning',
    'light',
  ] as const)('renders button with %s variant', (variant) => {
    render(<Button variant={variant}>Variant</Button>)

    expect(screen.getByRole('button', { name: /Variant/i })).toHaveClass(
      VARIANT[variant]
    )
  })
})
