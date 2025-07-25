import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Indicator, { STATUS } from './Indicator'

describe('Indicator', () => {
  test('renders the Indicator', () => {
    render(<Indicator status="online" />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  test('renders the online status', () => {
    render(<Indicator status="online" />)
    expect(screen.getByRole('status')).toHaveClass(STATUS.online)
  })

  test('renders the offline status correctly', () => {
    render(<Indicator status="offline" />)
    expect(screen.getByRole('status')).toHaveClass(STATUS.offline)
  })
})
