import { render, screen } from '@testing-library/react'
import HeroCardLayout from './HeroCardLayout'

describe('Title', () => {
  test('renders children', () => {
    render(
      <HeroCardLayout title="Welcome to Meta Town">children</HeroCardLayout>
    )

    expect(screen.getByText('children')).toBeInTheDocument()
  })

  test('renders title', () => {
    render(<HeroCardLayout title="Welcome to Meta Town">Home</HeroCardLayout>)

    expect(screen.getByText('Welcome to Meta Town')).toBeInTheDocument()
  })

  test('renders subtitle', () => {
    render(
      <HeroCardLayout title="Sign Up!" subtitle="Step Into Your Virtual World">
        Home
      </HeroCardLayout>
    )

    expect(screen.getByText('Step Into Your Virtual World')).toBeInTheDocument()
  })
})
