import { render, screen } from '@testing-library/react'
import LayoutContainer from './LayoutContainer'

describe('LayoutContainer', () => {
  test('renders LayoutContainer with given children', () => {
    render(<LayoutContainer>Layout container</LayoutContainer>)

    expect(screen.getByText('Layout container')).toBeInTheDocument()
  })

  test('renders LayoutContainer with given class name', () => {
    const className = 'py-16 px-16'

    render(
      <LayoutContainer className={className}>Layout container</LayoutContainer>
    )

    expect(screen.getByText('Layout container')).toHaveClass(className)
  })
})
