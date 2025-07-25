import { render, screen } from '@testing-library/react'
import GradientBackground, { VARIANT } from './GradientBackground'

describe('GradientBackground', () => {
  test('renders children', () => {
    render(<GradientBackground>Home</GradientBackground>)

    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  test('renders className', () => {
    render(<GradientBackground className="text-white">Home</GradientBackground>)

    expect(screen.getByText('Home')).toHaveClass('text-white')
  })

  test.each(['default', 'light', 'dark', 'dusk'] as const)(
    'renders background with %s variant',
    (variant) => {
      render(<GradientBackground variant={variant}>Variant</GradientBackground>)

      expect(screen.getByText('Variant')).toHaveClass(VARIANT[variant])
    }
  )
})
