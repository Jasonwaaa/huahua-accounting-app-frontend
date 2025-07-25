import { render, screen } from '@testing-library/react'
import draw from './_utils/draw'
import GroundFloor from './GroundFloor'

vi.mock('./_utils/draw')

describe('Ground', () => {
  test('renders the ground with the correct texture', () => {
    const texture = 'grass'

    render(<GroundFloor texture={texture} />)

    expect(
      screen.getByRole('img', { name: `Ground Floor - ${texture}` })
    ).toBeInTheDocument()

    expect(draw).toHaveBeenCalledWith(
      screen.getByRole('img', { name: `Ground Floor - ${texture}` }),
      texture
    )
  })
})
