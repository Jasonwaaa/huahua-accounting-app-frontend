import getCharacter, { SPRITE_SIZE } from '@/utils/getCharacter'
import draw from './draw'

vi.mock('@/utils/getCharacter')
const getCharacterMock = vi.mocked(getCharacter)

describe('draw', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  test('draws the character on the canvas', async () => {
    const character = 'FEMALE_01'

    const canvas = document.createElement('canvas')

    const context = {
      save: jest.fn(),
      drawImage: jest.fn(),
      restore: jest.fn(),
    } as unknown as CanvasRenderingContext2D

    vi.spyOn(canvas, 'getContext').mockReturnValue(context)

    const image = new Image()
    getCharacterMock.mockResolvedValue(image)

    await draw(canvas, character)

    expect(canvas.width).toBe(SPRITE_SIZE)
    expect(canvas.height).toBe(SPRITE_SIZE)

    expect(getCharacter).toHaveBeenCalledWith(character)

    expect(context.save).toHaveBeenCalled()

    expect(context.drawImage).toHaveBeenCalledWith(
      image,
      SPRITE_SIZE,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE,
      0,
      0,
      SPRITE_SIZE,
      SPRITE_SIZE
    )

    expect(context.restore).toHaveBeenCalled()
  })

  test('does not draw if context is not available', async () => {
    const canvas = document.createElement('canvas')

    vi.spyOn(canvas, 'getContext').mockReturnValue(null)

    const image = new Image()
    getCharacterMock.mockResolvedValue(image)

    await draw(canvas, 'FEMALE_01')

    expect(canvas.width).toBe(SPRITE_SIZE)
    expect(canvas.height).toBe(SPRITE_SIZE)

    expect(getCharacter).not.toHaveBeenCalled()
  })

  test('does not draw if canvas is null', async () => {
    await draw(null, 'FEMALE_01')

    expect(getCharacter).not.toHaveBeenCalled()
  })
})
