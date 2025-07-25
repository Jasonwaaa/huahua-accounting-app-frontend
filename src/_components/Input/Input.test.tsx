import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Input from './Input'

describe('Input', () => {
  test('renders input', () => {
    render(<Input />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders prefix', async () => {
    render(<Input prefix={{ name: 'search', label: 'Search' }} />)

    expect(await screen.findByLabelText('Search')).toBeInTheDocument()
  })

  test('passes the native value and onChange properties to the attributes', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Input onChange={onChange} />)

    await user.type(screen.getByRole('textbox'), 'Hello, World!')
    expect(screen.getByRole('textbox')).toHaveValue('Hello, World!')
    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: 'Hello, World!',
        }),
      })
    )
  })

  test('renders password input', async () => {
    render(<Input type="password" placeholder="Password" />)

    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'password'
    )
    expect(await screen.findByLabelText('Show password')).toBeInTheDocument()
  })

  test('toggles input type when clicking the show password button', async () => {
    render(<Input type="password" placeholder="Password" />)

    const user = userEvent.setup()

    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'password'
    )
    await user.click(await screen.findByLabelText('Show password'))
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'text'
    )
    await user.click(await screen.findByLabelText('Hide password'))
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute(
      'type',
      'password'
    )
  })
})
