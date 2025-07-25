import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Header from './Header'

describe('Header', () => {
  test('renders title', () => {
    const onClose = vi.fn()

    render(<Header onClose={onClose}>Personalize your identity</Header>)

    expect(
      screen.getByRole('heading', {
        name: 'Personalize your identity',
        level: 2,
      })
    ).toBeInTheDocument()
  })

  test('renders close button', async () => {
    const onClose = vi.fn()

    render(<Header onClose={onClose}>Personalize your identity</Header>)

    expect(
      await screen.findByRole('button', { name: 'Close' })
    ).toBeInTheDocument()
  })

  test('trigger onClose when close button is clicked', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()

    render(<Header onClose={onClose}>Personalize your identity</Header>)

    await user.click(await screen.findByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  test('renders Header without Close button when onClose is not given', () => {
    render(<Header>Personalize your identity</Header>)

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })
})
