import { render, screen } from '@testing-library/react'
import draw from './_utils/draw'
import Avatar from './Avatar'

vi.mock('./_utils/draw')
const drawMock = vi.mocked(draw)

describe('Avatar', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('renders the avatar with the correct character', () => {
    const character = 'FEMALE_01'
    const name = 'Display Name'

    render(<Avatar character={character} name={name} />)

    expect(screen.getByRole('img', { name })).toBeInTheDocument()

    expect(drawMock).toHaveBeenCalledWith(
      screen.getByRole('img', {
        name,
      }),
      character
    )
  })

  test('does not render avatar if character is not valid', () => {
    const character = 'INVALID_CHARACTER'
    const name = 'Display Name'

    render(<Avatar character={character} name={name} />)

    expect(screen.queryByRole('img', { name })).not.toBeInTheDocument()
    expect(drawMock).not.toHaveBeenCalled()
  })
})
