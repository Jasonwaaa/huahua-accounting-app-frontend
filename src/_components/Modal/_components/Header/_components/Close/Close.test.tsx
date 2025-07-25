import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Close from './Close'

describe('Close', () => {
  test('renders button', async () => {
    render(<Close onClose={vitest.fn()} />)

    expect(
      await screen.findByRole('button', { name: 'Close' })
    ).toBeInTheDocument()
  })

  test('triggers onClose when button is clicked', async () => {
    const onClose = vitest.fn()
    render(<Close onClose={onClose} />)

    await userEvent.click(await screen.findByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })
})
