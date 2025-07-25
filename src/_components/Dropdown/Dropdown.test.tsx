import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from '@/_components/Button'
import Dropdown, { POSITION, SIZE, VARIANT } from './Dropdown'

describe('Dropdown', () => {
  test('renders dropdown trigger button', () => {
    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument()
  })

  test('opens dropdown when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menu')).toHaveTextContent('Content')
  })

  test('closes the dropdown when trigger is clicked again', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Content
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    expect(screen.getByRole('menu')).toHaveTextContent('Content')
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test.each(['bottom-left', 'bottom-right', 'top-left', 'top-right'] as const)(
    'renders dropdown panel with %s position',
    async (position) => {
      const user = userEvent.setup()

      render(
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
          position={position}
        >
          Content
        </Dropdown>
      )

      await user.click(screen.getByRole('button', { name: 'Open' }))
      expect(screen.getByRole('menu')).toHaveTextContent('Content')
      expect(screen.getByRole('menu')).toHaveClass(POSITION[position])
    }
  )

  test.each(['small', 'default', 'large'] as const)(
    'renders dropdown panel with %s size',
    async (size) => {
      const user = userEvent.setup()

      render(
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
          size={size}
        >
          Content
        </Dropdown>
      )

      await user.click(screen.getByRole('button', { name: 'Open' }))
      expect(screen.getByRole('menu')).toHaveTextContent('Content')
      expect(screen.getByRole('menu')).toHaveClass(SIZE[size])
    }
  )

  test('closes the dropdown when clicked item inside without interrupt the original click', async () => {
    const user = userEvent.setup()

    const fn = vi.fn()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        <Button onClick={fn}>Logout</Button>
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    await user.click(screen.getByRole('button', { name: 'Logout' }))

    expect(fn).toHaveBeenCalled()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('closes the dropdown when clicking outside item without interrupting the original click', async () => {
    const user = userEvent.setup()

    const fn = vi.fn()

    render(
      <div>
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
        >
          Hello world
        </Dropdown>
        <Button onClick={fn}>Login</Button>
      </div>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(fn).toHaveBeenCalled()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('closes dropdown when function-based child element is clicked and ignoring outside click', async () => {
    const user = userEvent.setup()

    const handleOutsideClick = vi.fn()

    render(
      <div>
        <Dropdown
          trigger={(toggle, isOpen) => (
            <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
          )}
        >
          {(toggle) => <Button onClick={toggle}>Test child</Button>}
        </Dropdown>
        <Button onClick={handleOutsideClick}>Login</Button>
      </div>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Test child' }))

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  test('renders dropdown with default light variant', async () => {
    const user = userEvent.setup()

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
      >
        Variant
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(screen.getByRole('menu')).toHaveClass(VARIANT.light)
  })

  test('renders dropdown with dark variant', async () => {
    const user = userEvent.setup()
    const variant = 'dark'

    render(
      <Dropdown
        trigger={(toggle, isOpen) => (
          <Button onClick={toggle}>{isOpen ? 'Close' : 'Open'}</Button>
        )}
        variant={variant}
      >
        Variant
      </Dropdown>
    )

    await user.click(screen.getByRole('button', { name: 'Open' }))

    expect(screen.getByRole('menu')).toHaveClass(VARIANT[variant])
  })
})
