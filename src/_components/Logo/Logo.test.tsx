import { render, screen } from '@testing-library/react'
import Logo from './Logo'

describe('Logo', () => {
  test('renders link to the home page', () => {
    render(<Logo />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toHaveAttribute(
      'href',
      '/'
    )
  })

  test('renders logo with default light variant', () => {
    render(<Logo />)

    expect(
      screen.getByRole('img', { name: 'Meta Town (light)' })
    ).toBeInTheDocument()
  })

  test.each(['light', 'dark'] as const)(
    'renders logo with %s variant',
    (variant) => {
      render(<Logo variant={variant} />)

      expect(
        screen.getByRole('img', { name: `Meta Town (${variant})` })
      ).toBeInTheDocument()
    }
  )

  test('renders logo with custom className', () => {
    render(<Logo className="custom-class" />)

    expect(screen.getByRole('link', { name: 'Meta Town' })).toHaveClass(
      'custom-class'
    )
  })
})
