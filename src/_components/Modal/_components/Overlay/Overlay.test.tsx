import { render, screen } from '@testing-library/react'
import Overlay from './Overlay'

describe('Overlay', () => {
  test('renders overlay', () => {
    render(<Overlay />)

    expect(screen.getByRole('presentation')).toBeInTheDocument()
  })
})
