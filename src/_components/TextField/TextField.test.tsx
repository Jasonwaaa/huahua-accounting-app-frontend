import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextField from './TextField'

describe('TextField', () => {
  test('renders label', () => {
    render(<TextField label="Username" />)

    expect(screen.getByText('Username')).toBeInTheDocument()
  })

  test('renders error', () => {
    render(<TextField errorMessage="This field is required" />)

    expect(screen.getByText('This field is required')).toBeInTheDocument()
  })

  test('renders error message and style', () => {
    render(<TextField label="Username" errorMessage="This field is required" />)

    expect(screen.getByRole('textbox')).toHaveClass('border-rose-500')

    expect(screen.getByText('This field is required')).toHaveClass(
      'text-rose-500'
    )
  })

  test('renders input', () => {
    render(<TextField />)

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  test('renders TextField with prefix icon', async () => {
    render(<TextField prefix={{ name: 'search', label: 'Search' }} />)

    expect(await screen.findByLabelText('Search')).toBeInTheDocument()
  })

  test('passes value and onChange to Input', async () => {
    const handleChange = vi.fn()
    render(<TextField value="Test value" onChange={handleChange} />)

    const input = screen.getByRole('textbox')
    expect(input).toHaveValue('Test value')

    await userEvent.type(input, 'New Value')

    expect(handleChange).toHaveBeenCalled()
  })

  test('label htmlFor matches input id', () => {
    render(<TextField label="Username" />)

    const label = screen.getByText('Username')
    const input = screen.getByRole('textbox')

    expect(label).toHaveAttribute('for', input.id)
  })
})
