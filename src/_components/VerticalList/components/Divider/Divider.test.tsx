import { render, screen } from '@testing-library/react'
import Divider from './Divider'

describe('Divider', () => {
  test('renders divider', () => {
    render(<Divider />)

    expect(screen.getByRole('separator')).toBeInTheDocument()
  })
})
