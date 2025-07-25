import { render, screen } from '@testing-library/react'
import Chip from './Chip'

describe('Chip', () => {
  test('renders Chip with provided children', () => {
    render(<Chip>Text Content</Chip>)

    expect(screen.getByText('Text Content')).toBeInTheDocument()
  })
})
