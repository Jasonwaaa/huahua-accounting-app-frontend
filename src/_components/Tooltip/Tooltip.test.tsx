import { render, screen } from '@testing-library/react'
import Tooltip, { POSITION } from './Tooltip'

describe('Tooltip', () => {
  test('renders tooltip with provided children', () => {
    render(<Tooltip text="Tooltip text">Hover me</Tooltip>)
    expect(screen.getByText('Hover me')).toBeInTheDocument()
  })

  test('renders tooltip text', () => {
    render(<Tooltip text="Tooltip text">Hover me</Tooltip>)

    expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
      'hidden group-hover:block'
    )

    expect(
      screen.getByRole('tooltip', { name: 'Tooltip text' })
    ).toBeInTheDocument()
  })

  test.each([
    'top-left',
    'top',
    'top-right',
    'left',
    'right',
    'bottom-left',
    'bottom',
    'bottom-right',
  ] as const)('renders tooltip in %s position', (position) => {
    render(
      <Tooltip text="Tooltip text" position={position}>
        <button>Hover me</button>
      </Tooltip>
    )

    expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
      POSITION[position]
    )
  })

  test('renders tooltip with default center position', () => {
    render(
      <Tooltip text="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    )

    expect(screen.getByRole('tooltip', { name: 'Tooltip text' })).toHaveClass(
      POSITION.bottom
    )
  })
})
