import { render, screen } from '@testing-library/react'
import WaveAndStarBackground from './WaveAndStarBackground'

describe('WaveAndStarBackground', () => {
  test('renders children', () => {
    render(<WaveAndStarBackground>Home</WaveAndStarBackground>)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('renders className', () => {
    render(
      <WaveAndStarBackground className="text-white">Home</WaveAndStarBackground>
    )

    expect(screen.getByText('Home')).toHaveClass('text-white')
  })
})
