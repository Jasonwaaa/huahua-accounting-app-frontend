import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  test('renders modal with provided children', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Modal Content
      </Modal>
    )

    expect(screen.getByRole('dialog', { name: 'Modal' })).toBeInTheDocument()

    expect(
      screen.getByRole('heading', { name: 'Test Title' })
    ).toBeInTheDocument()

    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  test('renders overlay', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })

  test('renders Header', () => {
    render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  test('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()

    render(
      <Modal onClose={onClose} title="Test Title">
        Test
      </Modal>
    )

    await user.click(await screen.findByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalled()
  })

  test('renders nothing when there is no portal root', () => {
    // eslint-disable-next-line testing-library/no-node-access
    document.body.removeChild(document.getElementById('modal-root')!)

    const { container } = render(
      <Modal onClose={vi.fn()} title="Test Title">
        Test
      </Modal>
    )
    expect(container).toBeEmptyDOMElement()
  })

  test('renders Modal without Close button when onClose is not given', () => {
    render(<Modal title="Test Title">Test</Modal>)

    expect(
      screen.queryByRole('button', { name: 'Close' })
    ).not.toBeInTheDocument()
  })
})
